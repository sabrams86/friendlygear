var db = require('./../models');
var Validator = require('./../lib/validator');


var newpage = function (req, res, next) {
  res.render('contracts/new', {user: res.locals.user_id, item: res.locals.item_id})
}

var show = function (req, res, next) {
  db.Contracts.findById(req.params.contractId).then(function (contract) {
    db.Items.findById(contract.itemId).then(function (item) {
      var userInfo = {}
      if( contract.ownerId === req.session.user){
        userInfo.role = 'Owner';
      } else {
        userInfo.role = 'Renter';
      }
      res.render('contracts/show', {contract: contract, item: item, userInfo: userInfo});
    })
  });
  // db.Contracts.findById(req.params.contractId).then(function (contract) {
  //   if(contract.ownerId === res.locals.owner_id) {
  //     res.render('c')
  //   }
  // })
}

var create = function (req, res, next) {
  var validate = new Validator;
  if (!req.session.user) {
    validate._errors.push('You must be logged in to do that');
  }
  validate.exists(req.body.startDate, 'Please enter a start date');
  validate.exists(req.body.endDate, 'Please enter an end date');
  if(validate._errors.length > 0){
    res.render('contracts/new', {startDate: req.body.startDate, endDate: req.body.endDate, errors: validate._errors})
  } else {
    console.log(res.locals, req.session.user);
    db.Contracts.create({
      itemId: res.locals.item_id,
      buyerId: req.session.user,
      sellerId: res.locals.owner_id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: 'pending'
    }).then(function (result) {
      console.log(res.locals);
      res.redirect('/users/'+res.locals.owner_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
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
    //TODO add mailer to owner and sender notifying of cancellation
    req.flash('info', 'Rental Cancelled')
    res.redirect('/users/'+req.session.user+'/items');
  })
}
var approve = function (req, res, next) {
  db.Contracts.findByIdAndUpdate(req.params.contractId, { status: 'approved'}).then(function () {
    //TODO add mailer to owner and sender notifying of cancellation
    req.flash('info', 'Rental Approved')
    res.redirect('/users/'+req.session.user+'/items');
  })
}

module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
