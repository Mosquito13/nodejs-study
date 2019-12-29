const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.render('admin/product-list', {
        pageTitle: 'Product list',
        routePath: '/admin-products',
        isAuthenticated: req.session.authenticated,
        products
      });
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user
  });

  product
    .save()
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    routePath: '/add-product',
    isAuthenticated: req.session.authenticated
  });
};

exports.getEditProduct = (req, res) => {
  const { edit } = req.query;

  if (!edit) {
    return res.redirect('/');
  }

  const { productId } = req.params;

  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        routePath: '/edit-product',
        isAuthenticated: req.session.authenticated,
        product,
        edit
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { id, title, imageUrl, description, price } = req.body;

  Product.findById(id)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save();
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then(product => product.remove())
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};
