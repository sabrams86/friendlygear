var db = require('./../models');
var bcrypt = require('bcryptjs');

var getUser = function (user) {
  return db.Users.findById(user);
}

module.exports = getUser;
