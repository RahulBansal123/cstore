const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
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

    if (!phoneNumber || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter a phone number and an email address.' });
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

// fetch all sellers api
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

// approve seller
router.put('/approve/:sellerId', auth, async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const query = { _id: sellerId };
    const update = {
      status: 'Approved',
      isActive: true,
    };

    const sellerDoc = await Seller.findOneAndUpdate(query, update, {
      new: true,
    });

    await createSellerUser(
      sellerDoc.email,
      sellerDoc.name,
      sellerId,
      req.headers.host
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

// reject seller
router.put('/reject/:sellerId', auth, async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const query = { _id: sellerId };
    const update = {
      status: 'Rejected',
    };

    await Seller.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.post('/signup/:token', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const userDoc = await User.findOne({
      email,
      resetPasswordToken: req.params.token,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const query = { _id: userDoc._id };
    const update = {
      email,
      firstName,
      lastName,
      password: hash,
      resetPasswordToken: undefined,
    };

    await User.findOneAndUpdate(query, update, {
      new: true,
    });

    const sellerDoc = await Seller.findOne({
      email,
    });

    await createSellerBrand(sellerDoc);

    res.status(200).json({
      success: true,
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
    isActive: false,
  });

  return await newBrand.save();
};

const createSellerUser = async (email, name, seller, host) => {
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
    const buffer = await crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');
    const resetPasswordToken = resetToken;

    const user = new User({
      email,
      firstName,
      lastName,
      resetPasswordToken,
      seller,
      role: role.ROLES.Seller,
    });

    return await user.save();
  }
};

module.exports = router;
