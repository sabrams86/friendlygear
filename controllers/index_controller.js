var db = require('./../models');

var index = function(req, res, next) {
  if (req.query.category) {
    var query = {categories: {$in: [req.query.category]}}
  } else {
    var query = {};
  }
  db.Items.find(query).then(function (items) {
    res.render('index', { items: items, flash: req.flash('flash')});
  });
}

module.exports.index = index;
