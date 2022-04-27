const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
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
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('User', UserSchema);
