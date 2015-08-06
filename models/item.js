var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  datePurchased: String,
  condition: String,
  brand: String,
  categories: Array,
  imageUrl: String,
  userId: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
