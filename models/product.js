const ObjectID = require('mongodb').ObjectID;
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectID(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();

    let operation;

    if (this._id) {
      operation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      operation = db.collection('products').insertOne(this);
    }

    return operation.catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }

  static findById(productId) {
    const db = getDb();

    return db
      .collection('products')
      .find({ _id: new ObjectID(productId) })
      .next()
      .then(product => product)
      .catch(err => console.log(err));
  }

  static deleteById(productId) {
    const db = getDb();

    return db.collection('products')
      .deleteOne({ _id: new ObjectID(productId) })
      .catch(err => console.log(err));
  }
}

module.exports = Product;
