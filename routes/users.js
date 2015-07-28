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
  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    dateJoined: new Date().toString(),
    name: req.body.name
    }).then(function (result) {
    res.redirect('/users', {user: result});
  });
});

//***********
//** UPDATE**
//***********

//***********
//** DELETE**
//***********




module.exports = router;
