const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const { DB_STRING } = process.env;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(DB_STRING)
    .then(client => {
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'Database not found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
