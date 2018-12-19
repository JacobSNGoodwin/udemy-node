const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

// wrap connection in a method to run in app.js
const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://jacobgoodwin:3Fj5YDLRMn6N2bm@cluster0-yrdwb.mongodb.net/test?retryWrites=true')
  .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
