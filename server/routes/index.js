const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const productRoutes = require('./product');
const brandRoutes = require('./brand');
const sellerRoutes = require('./seller');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/address', addressRoutes);
router.use('/product', productRoutes);
router.use('/brand', brandRoutes);
router.use('/seller', sellerRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
