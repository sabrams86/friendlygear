var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  datePurchased: Date,
  condition: String,
  brand: String,
  categories: String,
  imageUrl: String,
  userId: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
