var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  datePurchased: {type: Date, required: true},
  condition: {type: String, required: true},
  brand: {type: String},
  categories: {type: String}
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
