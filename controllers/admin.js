const { uniqWith, isEqual } = require('lodash');
const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.find({ userId: req.user._id })
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add product',
      routePath: '/add-product',
      formValues: { title, imageUrl, price, description },
      validationErrors: uniqWith(errors.array(), isEqual)
    });
  }

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
        formValues: product,
        edit
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { id, title, imageUrl, description, price } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit product',
      routePath: '/edit-product',
      formValues: { _id: id, title, imageUrl, description, price },
      validationErrors: uniqWith(errors.array(), isEqual),
      edit: 1
    });
  }

  Product.findById(id)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }

      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save()
        .then(() => res.redirect('/admin/products'))
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.deleteOne({ _id: productId, userId: req.user._id })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};
