const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add product',
    routePath: '/add-product'
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res) => {
  res.render('shop', {
    pageTitle: 'Shop',
    routePath: '/',
    products: Product.fetchAll()
  });
};
