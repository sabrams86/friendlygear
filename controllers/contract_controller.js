var db = require('./../models');
var Validator = require('./../lib/validator');

var index = function(req, res, next) {
  res.send('respond with a resource');
}

var newpage = function (req, res, next) {
  res.render('contracts/new', {user: res.locals.user_id, item: res.locals.item_id})
}

var show = function (req, res, next) {
  db.Contracts.findById(req.params.contractId).then(function (contract) {
    res.render('contracts/show', {contract: contract});
  });
}

var create = function (req, res, next) {
  var validate = new Validator;
  validate.exists(req.body.startDate, 'Please enter a start date');
  validate.exists(req.body.endDate, 'Please enter an end date');
  if(validate._errors.length > 0){
    res.render('contracts/new', {startDate: req.body.startDate, endDate: req.body.endDate, errors: validate._errors})
  } else {
    db.Contracts.create({
      itemId: res.locals.item_id,
      buyerId: req.session.user,
      sellerId: res.locals.user_id,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }).then(function (result) {
      res.redirect('/users/'+res.locals.user_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
    });
  }
}

var edit = function (req, res, next) {
  db.Contracts.findById(req.params.contractId).then(function (contract) {
    res.render('contracts/edit', {contract:contract});
  });
}

var update = function (req, res, next) {
  db.Contracts.findByIdAndUpdate(req.params.contractId, {
    startDate: req.body.endDate,
    endDate: req.body.endDate
  }).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
  });
}

var destroy = function (req, res, next) {
  db.Contracts.findByIdAndRemove(req.params.contractId).then(function () {
    res.redirect('/users/'+req.session.user+'/contracts');
  })
}

module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
