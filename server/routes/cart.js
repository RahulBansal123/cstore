const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const caculateItemsSalesTax = (items) => {
  const taxRate = taxConfig.stateTaxRate;

  const products = items.map((item) => {
    item.priceAfterTax = 0;
    item.netPrice = 0;
    item.netTax = 0;
    item.priceBeforeTax = item.price;

    const price = item.priceBeforeTax;
    const quota = item.quota;
    item.netPrice = parseFloat(Number((price * quota).toFixed(2)));

    if (item.taxable) {
      const taxAmount = price * (taxRate / 100) * 100;

      item.netTax = parseFloat(Number((taxAmount * quota).toFixed(2)));
      item.priceAfterTax = parseFloat(
        Number((item.netPrice + item.netTax).toFixed(2))
      );
    }

    return item;
  });

  return products;
};
router.post('/add', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const items = req.body.products;

    const products = caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      products,
    });

    const cartDoc = await cart.save();

    decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.delete('/delete/:cartId', auth, async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.cartId });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.post('/add/:cartId', auth, async (req, res) => {
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $push: { products: product } }).exec();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.delete('/delete/:cartId/:productId', auth, async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $pull: { products: product } }).exec();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

const decreaseQuantity = (products) => {
  let bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quota: -item.quota } },
      },
    };
  });

  Product.bulkWrite(bulkOptions);
};

module.exports = router;
