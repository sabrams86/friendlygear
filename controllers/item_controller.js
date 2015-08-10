var db = require('./../models');
var Validator = require('./../lib/validator');
var dblib = require('./../lib/db_lib');


var index = function(req, res, next) {
  dblib.getItemsByUser(req.session.user).then(function (items) {
    dblib.getContractsByUser(res.locals.user_id).then(function (contracts) {
      dblib.getUserContractItems(contracts).then(function (rentalItems) {
        var userContracts = dblib.sortUserContracts(contracts, rentalItems, req.session.user);
        res.render('items/index', {items: items,
          rentalItems: rentalItems,
          sellerContracts: userContracts[1],
          buyerContracts: userContracts[0],
          user: res.locals.user,
          user_id: req.session.user
        });
      })
    })
  });
}

var newpage = function (req, res, next) {
  dblib.getCategories().then(function (categories) {
    res.render('items/new', {user_id: req.session.user, categories: categories});
  })
}

var show = function (req, res, next) {
  dblib.getItem(req.params.itemId).then(function (item) {
    dblib.getItemCategories(item).then(function (categories) {
      res.render('items/show', {user: req.session.user, owner: res.locals.user_id, item: item, categories: categories, user_id: req.session.user});
    });
  });
}

var create = function (req, res, next) {
  dblib.validateItem(req.body.item).then(function () {
    dblib.createItem(req.body.item, res.locals.user_id).then(function (item) {
      res.redirect('/users/'+res.locals.user_id+'/items');
    })}, function (errors) {
      dblib.getCategories().then(function (categories) {
        res.render('items/new', {item: req.body.item, errors: errors, categories: categories});
      });
  })
}

var edit = function (req, res, next) {
  dblib.getCategories().then(function (categories) {
    dblib.getItem(req.params.itemId).then(function (item) {
      dblib.getItemCategories(item).then(function (userCategories) {
        var categorylist = dblib.makeCategoryList(userCategories);
        res.render('items/edit', {item: item, categories: categories, userCategories: userCategories, catlist: categorylist, user_id: req.session.user});
      });
    });
  });
}

var update = function (req, res, next) {
  var categories = req.body.item.categories.split(',');
  categories.pop();
  dblib.validateItem(req.body.item).then(function () {
    dblib.updateItem(req.params.itemId, req.body.item, categories).then(function (item) {
      res.redirect('/users/'+res.locals.user_id+'/items/'+req.params.itemId);
    })
  }, function (errors) {
    res.render('items/new', {item: req.body.item, errors: errors, categories: categories});
  })
}

var destroy = function (req, res, next) {
  dblib.removeContractsByItem(req.params.itemId).then(function () {
    dblib.removeItem(req.params.itemId).then(function () {
      res.redirect('/users/'+res.locals.user_id+'/items');
    });
  });
}

module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
