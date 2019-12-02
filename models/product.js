const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }

    return callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = new Date().getTime().toString();

    getProductsFromFile(products => {
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), err => {
        if (err) console.log(err);
      });
    });
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);

      return callback(product);
    });
  }

  static fetchAll(callback) {
    return getProductsFromFile(callback);
  }
};
