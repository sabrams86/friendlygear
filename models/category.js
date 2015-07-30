var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: String,
  parentId: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
