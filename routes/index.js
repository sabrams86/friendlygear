var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Items.find({}).then(function (items) {
    res.render('index', { items: items, flash: req.flash('flash') });
  });
});

module.exports = router;
