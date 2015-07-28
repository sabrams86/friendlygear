var express = require('express');
var router = express.Router();
var db = require('./../models');

//***********
//** INDEX **
//***********
router.get('/items', function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (user) {
    db.Items.find({userId: user._id}).then(function (items) {
      res.render('items/index', {items: items});
    });
  });
});

//***********
//** NEW   **
//***********
router.get('/items/new', function (req, res, next) {
  res.render('items/new');
});

//***********
//** SHOW  **
//***********
router.get('/items/:itemId', function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/show', {item: item});
  });
});

//***********
//** EDIT **
//***********
router.get('/items/:itemId/edit', function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/show', {item: item});
  });
});

//***********
//** CREATE**
//***********
router.post('/items', function (req, res, next) {
  var itemFields = req.body.item;
  db.Items.create({
    name: item.name,
    description: item.description,
    brand: item.brand,
    datePurchased: item.datePurchased,
    condition: item.condition,
    categories: item.categories,
    userId: req.params.userId
    }).then(function (item) {
    res.redirect('/users/'+req.params.userId+'/items');
  });
});

//***********
//** UPDATE**
//***********
router.post('/items/:itemId', function (req, res, next) {
  var itemFields = req.body.item;
  db.Items.findByIdAndUpdate(req.params.itemId, {
    name: item.name,
    description: item.description,
    brand: item.brand,
    datePurchased: item.datePurchased,
    condition: item.condition,
    categories: item.categories,
    userId: req.params.userId
    }).then(function (item) {
    res.redirect('/users/'+req.params.userId+'/items/'+req.params.itemId);
  });
});

//***********
//** DELETE**
//***********
router.post('/items/:itemId/delete', function (req, res, next) {
  db.Items.findByIdAndRemove(req.body.itemId).then(function (result) {
    res.redirect('/users/'+req.params.userId+'/items');
  });
});



module.exports = router;
