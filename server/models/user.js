const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    index: true,
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    default: null,
  },
  role: {
    type: String,
    default: 'MEMBER',
    enum: ['MEMBER', 'ADMIN', 'SELLER'],
    index: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('User', UserSchema);
