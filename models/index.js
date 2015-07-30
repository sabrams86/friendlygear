var mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.MONGOLAB_URI);

module.exports.Users = require('./user');
module.exports.Items = require('./item');
module.exports.Contracts = require('./contract');
module.exports.Categories = require('./category');
