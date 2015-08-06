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
  var userFields = req.body.user;
  var validate = new Validator;
  validate.exists(userFields.username, 'Username cannot be blank');
  validate.exists(userFields.email, 'Email cannot be blank');
  validate.exists(userFields.name, 'Name cannot be blank');
  validate.exists(userFields.zip, 'Zipcode cannot be blank');
  validate.exists(userFields.city, 'City cannot be blank');
  validate.exists(userFields.state, 'State cannot be blank');
  validate.exists(userFields.password, 'Please enter a password');
  validate.password(userFields.password, userFields.passwordconfirm, 'Passwords do not match');
  if(validate._errors.length > 0) {
    res.render('users/new', {user: userFields, errors: validate._errors});
  } else {
    var date = new Date();
    date = date.toString();
    var password = bcrypt.hashSync(userFields.password, 8);
    db.Users.create({
      username: userFields.username,
      password: password,
      email: userFields.email,
      city: userFields.city,
      state: userFields.state,
      zip: userFields.zip,
      dateJoined: date,
      name: userFields.name,
      avatarUrl: userFields.avatarUrl
      }).then(function (result) {
        console.log(result);
      req.session.user = result._id;
      res.redirect('/users/'+result._id);
    });
  }
}

var update = function(req, res, next) {
  var userFields = req.body.user;
  console.log(req.body.user);
  var validate = new Validator;
  validate.exists(userFields.username, 'Username cannot be blank');
  validate.exists(userFields.email, 'Email cannot be blank');
  validate.exists(userFields.name, 'Name cannot be blank');
  validate.exists(userFields.zip, 'Zipcode cannot be blank');
  validate.exists(userFields.city, 'City cannot be blank');
  validate.exists(userFields.state, 'State cannot be blank');
  validate.exists(userFields.password, 'Please enter your password');
  if(validate._errors.length > 0) {
    res.render('users/edit', {user_id: req.params.userId, user: req.body.user, errors: validate._errors});
  } else {
    db.Users.findById(req.params.userId).then(function (user) {
      console.log(user);
      if(bcrypt.compareSync(userFields.password, user.password)){
        db.Users.findByIdAndUpdate(req.params.userId, {
          username: userFields.username,
          city: userFields.city,
          state: userFields.state,
          zip: userFields.zip,
          email: userFields.email,
          name: userFields.name,
          avatarUrl: userFields.avatarUrl
          }).then(function (result) {
          res.redirect('/users/'+req.params.userId);
        });
      } else {
        res.render('users/edit', {user_id: req.params.userId, user: userFields, errors: ['Incorrect Password, Information not saved']});
      }
    })
  }
}

var destroy = function(req, res, next) {
  db.Items.remove({userId: req.params.userId}).then(function () {
    db.Contracts.remove({$or: [{sellerId: req.params.userId}, {buyerId: req.params.userId}]}).then(function () {
      db.Users.findByIdAndRemove(req.params.userId).then(function () {
        req.session = null;
        res.redirect('/');
      });
    });
  });
}
module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
