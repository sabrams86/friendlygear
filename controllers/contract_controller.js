var dblib = require('./../lib/db_lib');

var newpage = function (req, res, next) {
  res.render('contracts/new', {user: res.locals.user_id, item: res.locals.item_id})
}

var show = function (req, res, next) {
  dblib.getContract(req.params.contractId).then(function (contract) {
    dblib.getItem(contract.itemId).then(function (item) {
      var userInfo = dblib.setUserRole(contract.buyerId, req.session.user);
      res.render('contracts/show', {contract: contract, item: item, userInfo: userInfo});
    });
  });
}

var create = function (req, res, next) {
  dblib.validateContract(req.body, req.session.user).then(function () {
    dblib.createContract(req.body, req.session.user, res.locals).then(function (result) {
      console.log(result);
      res.redirect('/users/'+res.locals.owner_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
    })
  }, function (errors) {
    res.render('contracts/new', {startDate: req.body.startDate, endDate: req.body.endDate, errors: errors})
  })
}

var edit = function (req, res, next) {
  dblib.getContract(req.params.contractId).then(function (contract) {
    res.render('contracts/edit', {contract:contract});
  });
}

var update = function (req, res, next) {
  dblib.validateContract(req.body, res.locals, req.session.user).then(function () {
    dblib.updateContract(contractId, req.body).then(function (result) {
      res.redirect('/users/'+res.locals.user_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
    })
  }, function (errors) {
    res.render('contracts/new', {startDate: req.body.startDate, endDate: req.body.endDate, errors: errors})
  })
}

var destroy = function (req, res, next) {
  dblib.removeContract(req.params.contractId).then(function () {
    //TODO add mailer to owner and sender notifying of cancellation
    req.flash('info', 'Rental Cancelled')
    res.redirect('/users/'+req.session.user+'/items');
  })
}
var approve = function (req, res, next) {
  dblib.approveContract(req.params.contractId).then(function () {
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
module.exports.approve = approve;
