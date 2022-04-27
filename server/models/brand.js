const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
};

Mongoose.plugin(slug, options);

const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    default: null,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Brand', BrandSchema);
