var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.category) {
    var query = {categories: req.query.category}
  } else {
    var query = {};
  }
  db.Items.find(query).then(function (items) {
    res.render('index', { items: items, flash: req.flash('flash'), user_id: req.session.user });
  });
});

module.exports = router;
