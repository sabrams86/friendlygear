var express = require('express');
var router = express.Router();
var db = require('./../models');

//***********
//** INDEX **
//***********
router.get('/users', function(req, res, next) {
  db.Users.find({}).then(function (results) {
    res.render('users/index', {users: results});
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
router.get('/users/:userId', function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (result) {
    res.render('users/show', {user: result});
  });
});

//***********
//** EDIT **
//***********
router.get('/users/:userId/edit', function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (result) {
    res.render('users/edit', {user: result});
  });
});

//***********
//** CREATE**
//***********
router.post('/users', function(req, res, next) {
  date = new Date();
  date = date.toString();
  console.log(date, date.toString());
  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    dateJoined: date,
    name: req.body.name
    }).then(function (result) {
    res.redirect('/users', {user: result});
  }, function (err) {
    var error = new Error('something went wrong')
    console.log(err);
    res.render('users/new', {errors: err});
  });
});

//***********
//** UPDATE**
//***********
router.post('/users/:userId', function(req, res, next) {
  db.Users.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name
    }).then(function (result) {
    res.redirect('/users/'+req.params.userId);
  });
});

//***********
//** DELETE**
//***********
router.post('/users/:userId/delete', function(req, res, next) {
  db.Users.findByIdAndRemove(req.params.userId).then(function (result) {
    res.redirect('/users');
  });
});



module.exports = router;
