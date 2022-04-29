const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Review = require('../models/review');
const Product = require('../models/product');
const auth = require('../middleware/auth');

router.post('/add', auth, (req, res) => {
  const user = req.user;

  const review = new Review(Object.assign(req.body, { user: user._id }));

  review.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      message: `Your review has been added successfully!`,
      review: data,
    });
  });
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate({
        path: 'user',
        select: 'firstName',
      })
      .populate({
        path: 'product',
        select: 'name slug image',
      })
      .sort('-created');

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const productDoc = await Product.findOne({ slug: req.params.slug });

    if (!productDoc) {
      return res.status(404).json({
        message: 'No reviews for this product.',
      });
    }

    const reviews = await Review.find({
      product: productDoc._id,
    })
      .populate({
        path: 'user',
        select: 'firstName',
      })
      .sort('-created');

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const update = req.body;
    const query = { _id: reviewId };

    await Review.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'review has been updated successfully!',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const review = await Review.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `review has been deleted successfully!`,
      review,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

module.exports = router;
