var db = require('./../models');
var Validator = require('./../lib/validator');
var bcrypt = require('bcryptjs');

var index = function(req, res, next) {
  db.Users.find({}).then(function (results) {
    res.render('users/index', {users: results, flash: req.flash('flash'), user_id: req.session.user});
  });
}

var newpage = function (req, res, next) {
  res.render('users/new');
}

var show = function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (result) {
    if(req.session.user === result._id.toString()){
      res.render('users/show', {user: result,  user_id: req.session.user});
    } else {
      req.flash('flash', 'You do not have access to that page');
      res.redirect('/');
    }
  });
}

var edit = function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (result) {
    res.render('users/edit', {user: result, user_id: req.session.user});
  });
}

var create = function(req, res, next) {
  var validate = new Validator;
  validate.exists(req.body.username, 'Username cannot be blank');
  validate.exists(req.body.email, 'Email cannot be blank');
  validate.exists(req.body.name, 'Name cannot be blank');
  validate.exists(req.body.password, 'Please enter a password');
  validate.password(req.body.password, req.body.passwordconfirm, 'Passwords do not match');
  if(validate._errors.length > 0) {
    res.render('users/new', {username: req.body.username, email: req.body.email, name: req.body.name, avatarUrl: req.body.avatarUrl, errors: validate._errors});
  } else {
    date = new Date();
    date = date.toString();
    password = bcrypt.hashSync(req.body.password, 8);
    db.Users.create({
      username: req.body.username,
      password: password,
      email: req.body.email,
      dateJoined: date,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl
      }).then(function (result) {
        console.log(result);
      req.session.user = result._id;
      res.redirect('/users/'+result._id);
    });
  }
}

var update = function(req, res, next) {
  db.Users.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    avatarUrl: req.body.avatarUrl
    }).then(function (result) {
    res.redirect('/users/'+req.params.userId);
  });
}

var destroy = function(req, res, next) {
  db.Users.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    avatarUrl: req.body.avatarUrl
    }).then(function (result) {
    res.redirect('/users/'+req.params.userId);
  });
}
module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
