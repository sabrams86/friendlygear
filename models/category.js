var mongoose = require('mongoose');

var categorySchema = new mongoose.Model({
  name: String,
  parentId: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
