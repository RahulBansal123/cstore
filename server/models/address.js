const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: String,
    index: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = Mongoose.model('Address', AddressSchema);
