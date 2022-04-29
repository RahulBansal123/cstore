const express = require('express');
const router = express.Router();

const Product = require('../../models/product');
const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../helpers/auth');

router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug }).populate({
      path: 'brand',
    });

    if (!productDoc) {
      return res.status(404).json({
        message: 'No product found.',
      });
    }

    res.status(200).json({
      product: productDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.get('/search/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' } },
      { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.',
      });
    }

    res.status(200).json({
      products: productDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.post('/list', async (req, res) => {
  try {
    let { sortOrder, rating, max, min, pageNumber: page = 1 } = req.body;

    const pageSize = 8;
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating
      ? { rating: { $gte: rating } }
      : { rating: { $gte: rating } };

    const basicQuery = [
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brands',
        },
      },
      {
        $unwind: {
          path: '$brands',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          'brand.name': '$brands.name',
          'brand._id': '$brands._id',
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          totalRatings: { $sum: '$reviews.rating' },
          totalReviews: { $size: '$reviews' },
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $eq: ['$totalReviews', 0] },
              0,
              { $divide: ['$totalRatings', '$totalReviews'] },
            ],
          },
        },
      },
      {
        $match: {
          price: priceFilter.price,
          averageRating: ratingFilter.rating,
        },
      },
      {
        $project: {
          brands: 0,
          reviews: 0,
        },
      },
    ];

    const userDoc = await checkAuth(req);

    let products = null;
    let productsCount = 0;

    if (userDoc) {
      productsCount = await Product.aggregate([].concat(basicQuery));
      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (productsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize },
      ];
      products = await Product.aggregate(
        [].concat(basicQuery).concat(paginateQuery)
      );
    } else {
      productsCount = await Product.aggregate(basicQuery);
      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (productsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize },
      ];
      products = await Product.aggregate(basicQuery.concat(paginateQuery));
    }

    res.status(200).json({
      products,
      page,
      pages:
        productsCount.length > 0
          ? Math.ceil(productsCount.length / pageSize)
          : 0,
      totalProducts: productsCount.length,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

// fetch store products by brand api
router.get('/list/brand/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const brand = await Brand.findOne({ slug });

    if (!brand) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`,
      });
    }

    const userDoc = await checkAuth(req);

    if (userDoc) {
      const products = await Product.aggregate([
        {
          $match: {
            brand: brand._id,
          },
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brands',
          },
        },
        {
          $unwind: '$brands',
        },
        {
          $addFields: {
            'brand.name': '$brands.name',
            'brand._id': '$brands._id',
          },
        },
        { $project: { brands: 0 } },
      ]);

      res.status(200).json({
        products: products.reverse(),
        page: 1,
        pages: products.length,
        totalProducts: products.length,
      });
    } else {
      const products = await Product.find({
        brand: brand._id,
      }).populate('brand', 'name');

      res.status(200).json({
        products: products.reverse(),
        page: 1,
        pages: products.length,
        totalProducts: products.length,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

// Returns only products name
router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.post(
  '/add',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const brand = req.body.brand;
      const image = req.body.image;

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      if (!quantity) {
        return res.status(400).json({ error: 'You must enter a quantity.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }

      const foundProduct = await Product.findOne({ name });

      if (foundProduct) {
        return res.status(400).json({ error: 'This name is already in use.' });
      }

      const product = new Product({
        name,
        description,
        quantity,
        price,
        brand,
        image,
      });

      const savedProduct = await product.save();

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.get(
  '/',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.seller) {
        const brands = await Brand.find({
          seller: req.user.seller,
        }).populate('seller', '_id');

        const brandId = brands[0]['_id'];

        products = await Product.find({})
          .populate({
            path: 'brand',
            populate: {
              path: 'seller',
              model: 'Seller',
            },
          })
          .where('brand', brandId);
      } else {
        products = await Product.find({}).populate({
          path: 'brand',
          populate: {
            path: 'seller',
            model: 'Seller',
          },
        });
      }

      res.status(200).json({
        products,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

router.get(
  '/:id',
  auth,
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      const productId = req.params.id;

      let productDoc = null;

      if (req.user.seller) {
        const brands = await Brand.find({
          seller: req.user.seller,
        }).populate('seller', '_id');

        const brandId = brands[0]['_id'];

        productDoc = await Product.findOne({ _id: productId })
          .populate({
            path: 'brand',
            select: 'name',
          })
          .where('brand', brandId);
      } else {
        productDoc = await Product.findOne({ _id: productId }).populate({
          path: 'brand',
          select: 'name',
        });
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.',
        });
      }

      res.status(200).json({
        product: productDoc,
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
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!',
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
  role.findRole(role.ROLES.Admin, role.ROLES.Seller),
  async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.',
      });
    }
  }
);

module.exports = router;
