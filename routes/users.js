var express = require('express');
var router = express.Router();
var db = require('./../models');
var bcrypt = require('bcryptjs');
var lib = require('./../lib/user_lib');

var authorizeUser = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(req.params.userId).then(function (user) {
      if(req.session.user === user._id.toString()){
        next();
      } else {
        req.flash('flash', 'You do not have access to that page');
        res.redirect('/');
      }
    });
  } else {
    req.flash('flash', 'You do not have access to that page, try logging in');
    res.redirect('/');
  }
}

var authorizeAdmin = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(req.params.userId).then(function (user) {
      if(req.session.user === user._id.toString()){
        next();
      } else {
        req.flash('flash', 'You do not have access to that page');
        res.redirect('/');
      }
    });
  } else {
    req.flash('flash', 'You do not have access to that page, try logging in');
    res.redirect('/');
  }
}

//***********
//** INDEX **
//***********
router.get('/users', authorizeUser, function(req, res, next) {
  db.Users.find({}).then(function (results) {
    res.render('users/index', {users: results, flash: req.flash('flash'), user_id: req.session.user});
  });
});

//***********
//** NEW   **
//***********
router.get('/users/new', function (req, res, next) {
  res.render('users/new');
});

//***********
//** SHOW  **
//***********
router.get('/users/:userId', authorizeUser, function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (result) {
    if(req.session.user === result._id.toString()){
      res.render('users/show', {user: result,  user_id: req.session.user});
    } else {
      req.flash('flash', 'You do not have access to that page');
      res.redirect('/');
    }
  });
});

//***********
//** EDIT **
//***********
router.get('/users/:userId/edit', authorizeUser, function(req, res, next) {
  lib(req.params.userId).then(function (result) {
    res.render('users/edit', {user: result, user_id: req.session.user});
  });
});

//***********
//** CREATE**
//***********
router.post('/users', function(req, res, next) {
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
    req.session.user = result._id;
    res.redirect('/users/'+result._id);
  });
});

//***********
//** UPDATE**
//***********
router.post('/users/:userId', authorizeUser, function(req, res, next) {
  db.Users.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    avatarUrl: req.body.avatarUrl
    }).then(function (result) {
    res.redirect('/users/'+req.params.userId);
  });
});

//***********
//** DELETE**
//***********
router.post('/users/:userId/delete', authorizeUser, function(req, res, next) {
  db.Users.findByIdAndRemove(req.params.userId).then(function (result) {
    res.redirect('/');
  });
});



module.exports = router;
