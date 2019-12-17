const ObjectID = require('mongodb').ObjectID;
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
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

  static findById(userId) {
    const db = getDb();

    return db.collection('users').findOne({ _id: new ObjectID(userId) });
  }
}

module.exports = User;
