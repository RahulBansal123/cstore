const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
};

Mongoose.plugin(slug, options);

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
    index: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Product', ProductSchema);
