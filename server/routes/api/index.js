const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const sellerRoutes = require('./seller');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// seller routes
router.use('/seller', sellerRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

module.exports = router;
