var express = require('express');
var router = express.Router();
var db = require('./../models');

var getUser = function (req, res, next) {
  db.Users.findById(res.locals.user_id).then(function (user) {
    res.locals.user = user;
    next();
  });
}

var authorizeUser = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(res.locals.user_id).then(function (user) {
      if(req.session.user === user._id.toString()){
        next();
      } else {
        req.flash('flash', 'You do not have access to that page');
        res.redirect('/');
      }
    });
  } else {
    req.flash('flash', 'You do not have access to that page, try logging in');
    res.redirect('/');
  }
}

//***********
//** INDEX **
//***********
router.get('/items', getUser, function(req, res, next) {
  if(req.session.user){
    db.Items.find({userId: req.session.user}).then(function (items) {
      res.render('items/index', {items: items, user: res.locals.user,  user_id: req.session.user});
    });
  } else {
    req.flash('flash', 'You must be logged in to see that page');
    res.redirect('/');
  }
});

//***********
//** NEW   **
//***********
router.get('/items/new', function (req, res, next) {
  if(req.session.user){
    res.render('items/new', {user_id: req.session.user});
  } else {
    req.flash('flash', 'You must be logged in to list gear');
    res.redirect('/');
  }
});

//***********
//** SHOW  **
//***********
router.get('/items/:itemId', function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/show', {user: req.session.user, owner: res.locals.user_id, item: item, user_id: req.session.user});
  });
});

//***********
//** EDIT **
//***********
router.get('/items/:itemId/edit', authorizeUser, function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    res.render('items/edit', {item: item,  user_id: req.session.user});
  });
});

//***********
//** CREATE**
//***********
router.post('/items', function (req, res, next) {
  if(req.session.user){
    var itemFields = req.body.item;
    db.Items.create({
      name: itemFields.name,
      description: itemFields.description,
      brand: itemFields.brand,
      datePurchased: itemFields.datePurchased,
      condition: itemFields.condition,
      categories: itemFields.categories,
      imageUrl: itemFields.imageUrl,
      userId: res.locals.user_id
      }).then(function (item) {
      res.redirect('/users/'+res.locals.user_id+'/items');
    });
  } else {
    req.flash('flash', 'You must be logged in to list gear');
    res.redirect('/');
  }
});

//***********
//** UPDATE**
//***********
router.post('/items/:itemId', authorizeUser, function (req, res, next) {
  var itemFields = req.body.item;
  db.Items.findByIdAndUpdate(req.params.itemId, {
    name: itemFields.name,
    description: itemFields.description,
    brand: itemFields.brand,
    datePurchased: itemFields.datePurchased,
    condition: itemFields.condition,
    imageUrl: itemFields.imageUrl,
    categories: itemFields.categories,
    }).then(function (item) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+req.params.itemId);
  });
});

//***********
//** DELETE**
//***********
router.post('/items/:itemId/delete', authorizeUser, function (req, res, next) {
  db.Items.findByIdAndRemove(req.body.itemId).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items');
  });
});



module.exports = router;
