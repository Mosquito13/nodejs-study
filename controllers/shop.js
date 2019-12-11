const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res) => {
  Product.findAll()
    .then(products =>
      res.render('shop/index', {
        pageTitle: 'Shop',
        routePath: '/',
        products
      })
    )
    .catch(err => console.log(err));
};

exports.getProducts = (req, res) => {
  Product.findAll()
    .then(products =>
      res.render('shop/product-list', {
        pageTitle: 'Product list',
        routePath: '/products',
        products
      })
    )
    .catch(err => console.log(err));
};

exports.getProduct = (req, res) => {
  const { productId } = req.params;

  Product.findByPk(productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: 'Product detail',
        routePath: '/products',
        product
      });
    })
    .catch(err => console.log(err));
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
  req.user
    .getCart()
    .then(cart => cart.getProducts())
    .then(cartProducts => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        routePath: '/cart',
        cartProducts
      });
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price, () => {
      res.redirect('/cart');
    });
  });
};
