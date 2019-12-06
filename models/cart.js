const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.quantity += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), err => {
        if (err) console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice, callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }

      let cart = JSON.parse(fileContent);

      const cartProduct = cart.products.find(p => p.id === id);
      const updatedCart = {...cart};

      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      if (cartProduct && cartProduct.quantity) {
        updatedCart.totalPrice -= productPrice * cartProduct.quantity;
      }

      fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
        if (err) console.log(err);

        callback();
      });
    });
  }

  static getCart(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return callback(null);
      }
      
      return callback(JSON.parse(fileContent));
    });
  }
};
