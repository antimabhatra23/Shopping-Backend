const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  color: String,
  description: String,
  img: String,
  price:Number,
  category:String,
  size:String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
