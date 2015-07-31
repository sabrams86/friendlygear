var db = require('./../models');
var bcrypt = require('bcryptjs');

var loginUser = function (req, res, next) {
  db.Users.find({username: req.body.username}).then(function (user) {
    if (bcrypt.compareSync(req.body.password, user.password)){
      req.session.user = user._id;
      res.redirect('/users/'+user._id+'/items');
    } else {
      res.redirect('/', {error: 'Password is incorrect, please try again'});
    }
  }, function (err) {
    res.redirect('/', {flash: 'Username not found, please try again'});
  });
}

var logoutUser = function (req, res, next) {
  req.session = null;
  res.redirect('/');
}

module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
