const express = require('express');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('shop', {
    pageTitle: 'Shop',
    routePath: '/',
    products: adminData.products,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
