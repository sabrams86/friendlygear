var db = require('./../models');
var Validator = require('./../lib/validator');
var dblib = require('./../lib/db_lib');

var index = function (req, res, next) {
  dblib.getCategories().then(function (results) {
    if (req.xhr) {
      res.json(results);
    } else {
      res.render('categories/index', {categories: results});
    }
  });
}

var create = function (req, res, next) {
  dblib.validateCategory(req.body.name).then(function () {
    dblib.createCategory(req.body.name, req.body.parent).then(function (result) {
        res.redirect('/categories');
    })}, function (errors) {
    dblib.getCategories().then(function (results) {
      res.render('categories/index', {categories: results, errors: validate._errors});
    });
  })
}

module.exports.index = index;
module.exports.create = create;
