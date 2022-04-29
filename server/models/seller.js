const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const SellerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  brand: {
    type: String,
  },
  business: {
    // Business description
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Seller', SellerSchema);
