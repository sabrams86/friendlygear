var express = require('express');
var router = express.Router();
var db = require('./../models');
var bcrypt = require('bcryptjs');

router.post('/login', function (req, res, next) {
  db.Users.findOne({username: req.body.username}).then(function (user) {
    if (bcrypt.compareSync(req.body.password, user.password)){
      req.session.user = user._id;
      res.redirect('/users');
    } else {
      res.redirect('/');
    }
  });
});

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
