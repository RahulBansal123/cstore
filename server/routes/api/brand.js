const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Brand = require('../../models/brand');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../helpers/store');

router.post('/add', auth, role.findRole(role.ROLES.Admin), async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const isActive = req.body.isActive;

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }

    const brand = new Brand({
      name,
      description,
      isActive,
    });

    const brandDoc = await brand.save();

    res.status(200).json({
      success: true,
      message: `Brand has been added successfully!`,
      brand: brandDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

// fetch store brands api
router.get('/list', async (req, res) => {
  try {
    const brands = await Brand.find({
      isActive: true,
    }).populate('seller', 'name');

    res.status(200).json({
      brands,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

// fetch brands api
router.get(
  '/',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      let brands = null;

      if (req.user.seller) {
        brands = await Brand.find({
          seller: req.user.seller,
        }).populate('seller', 'name');
      } else {
        brands = await Brand.find({}).populate('seller', 'name');
      }

      res.status(200).json({
        brands,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const brandId = req.params.id;

    const brandDoc = await Brand.findOne({ _id: brandId });

    if (!brandDoc) {
      res.status(404).json({
        message: `Cannot find brand with the id: ${brandId}.`,
      });
    }

    res.status(200).json({
      brand: brandDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.get(
  '/list/select',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      let brands = null;

      if (req.user.seller) {
        brands = await Brand.find(
          {
            seller: req.user.seller,
          },
          'name'
        );
      } else {
        brands = await Brand.find({}, 'name');
      }

      res.status(200).json({
        brands,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      const brandId = req.params.id;
      const update = req.body.brand;
      const query = { _id: brandId };

      await Brand.findOneAndUpdate(query, update, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: 'Brand has been updated successfully!',
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      const brandId = req.params.id;
      const update = req.body.brand;
      const query = { _id: brandId };

      // disable brand(brandId) products
      if (!update.isActive) {
        const products = await Product.find({ brand: brandId });
        store.disableProducts(products);
      }

      await Brand.findOneAndUpdate(query, update, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: 'Brand has been updated successfully!',
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.findRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const brand = await Brand.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        brand,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

module.exports = router;
