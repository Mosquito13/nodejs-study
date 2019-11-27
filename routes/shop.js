const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('shop');
});

module.exports = router;
