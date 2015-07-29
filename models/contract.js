var mongoose = require('mongoose');

var contractSchema = new mongoose.Schema({
  itemId: String,
  sellerId: String,
  buyerId: String,
  startDate: Date,
  endDate: Date
});

var Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
