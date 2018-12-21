const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
  products: [{
    product: { type: Object, required: true },
    quantity: { type: Number, requireD: true }
  }],
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      rerequired: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);