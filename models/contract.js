var mongoose = require('mongoose');

var contractSchema = new mongoose.Schema({
  itemId: String,
  sellerId: String,
  buyerId: String,
  startDate: String,
  endDate: String,
  status: String
});

var Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
