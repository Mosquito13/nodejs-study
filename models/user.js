const ObjectID = require('mongodb').ObjectID;
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id ? new ObjectID(id) : null;
  }

  save() {
    const db = getDb();

    if (this._id) {
      return db
        .collection('users')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      return db.collection('users').insertOne(this);
    }
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      cp => cp.productId.toString() === product._id.toString()
    );

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectID(product._id),
        quantity: 1
      });
    }

    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectID(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  removeFromCart(productId) {
    const db = getDb();

    const updatedCartItems = this.cart.items.filter(
      p => p.productId.toString() !== productId.toString()
    );

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectID(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  getCart() {
    const db = getDb();

    const productIds = this.cart.items.map(item => item.productId);

    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products =>
        products.map(p => ({
          ...p,
          quantity: this.cart.items.find(
            i => i.productId.toString() === p._id.toString()
          ).quantity
        }))
      );
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new ObjectID(this._id),
            name: this.name,
            email: this.email
          }
        };
        return db.collection('orders').insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectID(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();

    return db
      .collection('orders')
      .find({ 'user._id': new ObjectID(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();

    return db.collection('users').findOne({ _id: new ObjectID(userId) });
  }
}

module.exports = User;
