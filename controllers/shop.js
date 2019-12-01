const Product = require('../models/product');

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      routePath: '/',
      products
    });
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      pageTitle: 'Product list',
      routePath: '/product-list',
      products
    });
  });
};

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    routePath: '/cart'
  });
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    routePath: '/orders'
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    routePath: '/checkout'
  });
};
