const Product = require('../models/product');
const Cart = require('../models/cart');

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
      routePath: '/products',
      products
    });
  });
};

exports.getProduct = (req, res) => {
  const { productId } = req.params;

  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      pageTitle: 'Product detail',
      routePath: '/products',
      product
    });
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

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    routePath: '/cart'
  });
};

exports.addToCart = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect('/cart');
};