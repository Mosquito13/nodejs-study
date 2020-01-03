const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res) => {
  Product.find()
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
  Product.find()
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

  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: 'Product detail',
        routePath: '/products',
        product
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    routePath: '/checkout'
  });
};

exports.getCart = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        routePath: '/cart',
        cartProducts: user.cart.items
      });
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then(product => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;

  req.user
    .removeFromCart(productId)
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCreateOrder = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => ({
        quantity: item.quantity,
        product: { ...item.productId._doc }
      }));
      const order = new Order({
        products,
        user: {
          email: req.user.email,
          userId: req.user._id
        }
      });

      return order.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch(err => console.log(err));
};

exports.getOrders = (req, res) => {
  Order
    .find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        routePath: '/orders',
        orders
      });
    })
    .catch(err => console.log(err));
};
