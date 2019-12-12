const Product = require('../models/product');

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
  let fetchedCart,
    newQuantity = 1;

  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        newQuantity = product.cartItem.quantity + 1;

        return product;
      } else {
        return Product.findByPk(productId);
      }
    })
    .then(product =>
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    )
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;

  req.user
    .getCart()
    .then(cart => cart.getProducts({ where: { id: productId } }))
    .then(([product]) => product.cartItem.destroy())
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCreateOrder = (req, res) => {
  req.user
    .getCart()
    .then(cart => cart.getProducts())
    .then(products =>
      req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(p => {
              p.orderItem = { quantity: p.cartItem.quantity };

              return p;
            })
          );
        })
        .catch(err => console.log(err))
    )
    .then(() => res.redirect('/orders'))
    .catch(err => console.log(err));
};
