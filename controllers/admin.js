const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      pageTitle: 'Product list',
      routePath: '/admin-products',
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
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    routePath: '/add-product'
  });
};

exports.getEditProduct = (req, res) => {
  const { edit } = req.query;

  if (!edit) {
    return res.redirect('/');
  }

  const { productId } = req.params;

  Product.findById(productId, product => {
    if (!product) {
      res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit product',
      routePath: '/edit-product',
      product,
      edit
    });
  });
};