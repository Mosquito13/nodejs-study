const Product = require('../models/product');

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
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

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description
    })
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

  req.user
    .getProducts({ where: { id: productId } })
    .then(([product]) => {
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

  Product.findByPk(id)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.findByPk(productId)
    .then(product => product.destroy())
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};
