const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/product-list', {
        pageTitle: 'Product list',
        routePath: '/admin-products',
        products
      });
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );

  product
    .save()
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
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

  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        routePath: '/edit-product',
        product,
        edit
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { id, title, imageUrl, description, price } = req.body;

  const product = new Product(title, price, description, imageUrl, id);

  product
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.deleteById(productId)
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};
