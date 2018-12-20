const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save () {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      // check if product already exists in a cart
      return cp.productId.toString() === product._id.toString(); // make sure id's are strings
    });

    let newQuantity = 1; // if it's a new cart
    const updatedCartItems = [...this.cart.items];



    if (cartProductIndex >= 0) {
      // if we have already have the product in the cart
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // if this is a new item
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart () {
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      // map into an array of strings of product ids
      return i.productId;
    });
    return db.collection('products')
      .find({ _id: { $in: productIds } })
      .toArray() // to array converts cursors to javascript array
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        })
      });
  }

  deleteItemFromCart (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder () {
    const db = getDb();
    return db.collection('orders').insertOne(this.cart)
      .then(result => {
        // clear cart in app and in db
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch(err => {
        console.log(err);
      })
  }

  static findById (userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
