const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add product',
    routePath: '/add-product',
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true
  });
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
