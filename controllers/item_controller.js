var db = require('./../models');
var Validator = require('./../lib/validator');

var index = function(req, res, next) {
  if(req.session.user){
    db.Items.find({userId: req.session.user}).then(function (items) {
      res.render('items/index', {items: items, user: res.locals.user,  user_id: req.session.user});
    });
  } else {
    req.flash('flash', 'You must be logged in to see that page');
    res.redirect('/');
  }
}

var newpage = function (req, res, next) {
  if(req.session.user){
    db.Categories.find({}).then(function (categories) {
      res.render('items/new', {user_id: req.session.user, categories: categories});
    })
  } else {
    req.flash('flash', 'You must be logged in to list gear');
    res.redirect('/');
  }
}

var show = function (req, res, next) {
  db.Items.findById(req.params.itemId).then(function (item) {
    db.Categories.find({_id: {$in: item.categories}}).then(function (categories) {
      res.render('items/show', {user: req.session.user, owner: res.locals.user_id, item: item, categories: categories, user_id: req.session.user});
    });
  });
}

var create = function (req, res, next) {
  if(req.session.user){
    var validate = new Validator;
    var itemFields = req.body.item;
    var categories = itemFields.categories.split(',');
    categories.pop();
    validate.exists(itemFields.name, 'Please add a name for this piece of gear');
    validate.exists(itemFields.description, 'Description cannot be blank');
    validate.exists(itemFields.datePurchased, 'Please estimate how old the item is');
    validate.exists(itemFields.condition, 'Condition cannot be blank');
    if(validate._errors.length > 0){
      db.Categories.find().then(function (categories) {
        res.render('items/new', {item: req.body.item, errors: validate._errors, categories: categories});
      });
    } else {
      db.Items.create({
        name: itemFields.name,
        description: itemFields.description,
        brand: itemFields.brand,
        datePurchased: itemFields.datePurchased,
        condition: itemFields.condition,
        categories: categories,
        imageUrl: itemFields.imageUrl,
        userId: res.locals.user_id
        }).then(function (item) {
        res.redirect('/users/'+res.locals.user_id+'/items');
      });
    }
  } else {
    req.flash('flash', 'You must be logged in to list gear');
    res.redirect('/');
  }
}

var edit = function (req, res, next) {
  db.Categories.find().then(function (categories) {
    db.Items.findById(req.params.itemId).then(function (item) {
      db.Categories.find({_id: {$in: item.categories}}).then(function (userCategories) {
        var categorylist = '';
        userCategories.forEach(function (e) {
          categorylist += (e._id + ',');
        });
        res.render('items/edit', {item: item, categories: categories, userCategories: userCategories, catlist: categorylist, user_id: req.session.user});
      });
    });
  });
}

var update = function (req, res, next) {
  console.log('asdf');
  var itemFields = req.body.item;
  var categories = itemFields.categories.split(',');
  categories.pop();
  db.Items.findByIdAndUpdate(req.params.itemId, {
    name: itemFields.name,
    description: itemFields.description,
    brand: itemFields.brand,
    datePurchased: itemFields.datePurchased,
    condition: itemFields.condition,
    imageUrl: itemFields.imageUrl,
    categories: categories,
    }).then(function (item) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+req.params.itemId);
  });
}

var destroy = function (req, res, next) {
  db.Items.findByIdAndRemove(req.params.itemId).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items');
  });
}


module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
