const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { apiURL } = keys.app;

router.use(`/${apiURL}`, apiRoutes);
router.use(`/${apiURL}`, (req, res) =>
  res.status(404).json('No matching route found')
);

module.exports = router;
