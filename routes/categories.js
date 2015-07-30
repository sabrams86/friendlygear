var express = require('express');
var router = express.Router();
var db = require('./../models');
var Validator = require('./../lib/validator')
//*************
//** INDEX ****
//*************
router.get('/categories', function (req, res, next) {
  db.Categories.find({}).then(function (results) {
    if (req.xhr) {
      res.json(results);
    } else {
      res.render('categories/index', {categories: results});
    }
  });
});
//*************
//** CREATE****
//*************
router.post('/categories', function (req, res, next) {
  var validate = new Validator;
  validate.exists(req.body.name, 'Please enter a category');
  if(validate._errors.length > 0) {
    db.Categories.find({}).then(function (results) {
      res.render('categories/index', {categories: results, errors: validate._errors});
    });
  } else {
    db.Categories.create({name: req.body.name, parent: req.body.parent}).then(function (result) {
        res.redirect('/categories');
    });
  }
});

module.exports = router;
