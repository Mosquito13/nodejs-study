const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      pageTitle: 'Product list',
      routePath: '/admin-product-list',
      products
    });
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product',
    routePath: '/add-product'
  });
};
