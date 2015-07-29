var express = require('express');
var router = express.Router();
var db = require('./../models');

var getUser = function (req, res, next) {
  db.Users.findById(res.locals.user_id).then(function (user) {
    res.locals.user = user;
    next();
  });
}

//***********
//** INDEX **
//***********
router.get('/items', getUser, function(req, res, next) {
  db.Items.find({userId: res.locals.user._id}).then(function (items) {
    res.render('items/index', {items: items});
  });
});

//***********
//** NEW   **
//***********
router.get('/items/new', function (req, res, next) {
  res.render('items/new', {user_id: res.locals.user_id});
});

//***********
//** SHOW  **
//***********
router.get('/items/:itemId', function (req, res, next) {
  console.log('test');
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/show', {item: item});
  });
});

//***********
//** EDIT **
//***********
router.get('/items/:itemId/edit', function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/edit', {item: item, user_id: res.locals.user_id});
  });
});

//***********
//** CREATE**
//***********
router.post('/items', function (req, res, next) {
  var itemFields = req.body.item;
  db.Items.create({
    name: itemFields.name,
    description: itemFields.description,
    brand: itemFields.brand,
    datePurchased: itemFields.datePurchased,
    condition: itemFields.condition,
    categories: itemFields.categories,
    userId: res.locals.user_id
    }).then(function (item) {
    res.redirect('/users/'+res.locals.user_id+'/items');
  });
});

//***********
//** UPDATE**
//***********
router.post('/items/:itemId', function (req, res, next) {
  var itemFields = req.body.item;
  db.Items.findByIdAndUpdate(req.params.itemId, {
    name: itemFields.name,
    description: itemFields.description,
    brand: itemFields.brand,
    datePurchased: itemFields.datePurchased,
    condition: itemFields.condition,
    categories: itemFields.categories,
    }).then(function (item) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+req.params.itemId);
  });
});

//***********
//** DELETE**
//***********
router.post('/items/:itemId/delete', function (req, res, next) {
  db.Items.findByIdAndRemove(req.body.itemId).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items');
  });
});



module.exports = router;
