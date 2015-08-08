var db = require('./../models');
var bcrypt = require('bcryptjs');
var dblib = require('./../lib/db_lib');

var loginUser = function (req, res, next) {
  dblib.findUserByUserName(req.body.username).then(function (user) {
    if (user){
      if (bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user._id;
        res.redirect('/users/'+user._id+'/items');
      } else {
        req.flash('flash', 'Password is incorrect, please try again')
        res.redirect('/');
      }
    } else {
      req.flash('flash', 'Username not found, please try again')
      res.redirect('/');
    }
  });
}

var logoutUser = function (req, res, next) {
  req.session = null;
  res.redirect('/');
}

module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
