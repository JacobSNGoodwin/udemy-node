const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// wrap connection in a method to run in app.js
const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://jacobgoodwin:3Fj5YDLRMn6N2bm@cluster0-yrdwb.mongodb.net/test?retryWrites=true')
  .then(client => {
    console.log('Connected!');
    callback(client);
  })
  .catch(err => console.log(err));
}

module.exports = mongoConnect;