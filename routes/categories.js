var express = require('express');
var router = express.Router();
var db = require('./../models');

router.get('/categories', function (req, res, next) {
  db.Categories.find({}).then(function (results) {
    res.json([{name: 'Hiking'},{name: 'Skiing'},{name: 'Camping'},{name: 'Biking'}]);
  });
});

module.exports = router;
