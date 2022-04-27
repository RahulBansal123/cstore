const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const Seller = require('../../models/seller');
const User = require('../../models/user');
const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/seller-request', async (req, res) => {
  try {
    const name = req.body.name;
    const business = req.body.business;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const brand = req.body.brand;
    const password = req.body.password;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }

    if (!business) {
      return res
        .status(400)
        .json({ error: 'You must enter a business description.' });
    }

    if (!phoneNumber || !email || !password) {
      return res.status(400).json({
        error: 'You must enter a phone number, password an email address.',
      });
    }

    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const seller = new Seller({
      name,
      email,
      business,
      phoneNumber,
      brand,
    });

    const sellerDoc = await seller.save();

    await createSellerUser(
      sellerDoc.email,
      sellerDoc.name,
      sellerDoc.sellerId,
      password
    );

    await createSellerBrand(sellerDoc);

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      seller: sellerDoc,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.get('/list', auth, role.findRole(role.ROLES.Admin), async (req, res) => {
  try {
    const sellers = await Seller.find({}).sort('-created');

    res.status(200).json({
      sellers,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.delete(
  '/delete/:id',
  auth,
  role.findRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const seller = await Seller.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Seller has been deleted successfully!`,
        seller,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

const createSellerBrand = async ({ _id, brand, business }) => {
  const newBrand = new Brand({
    name: brand,
    description: business,
    seller: _id,
  });

  return await newBrand.save();
};

const createSellerUser = async (email, name, seller, password) => {
  const firstName = name;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      seller,
      role: role.ROLES.Seller,
    };

    const sellerDoc = await Seller.findOne({
      email,
    });

    await createSellerBrand(sellerDoc);

    return await User.findOneAndUpdate(query, update, {
      new: true,
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      firstName,
      lastName,
      password: hash,
      seller,
      role: role.ROLES.Seller,
    });

    return await user.save();
  }
};

module.exports = router;
