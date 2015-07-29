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
router.get('/contracts', function(req, res, next) {
  res.send('respond with a resource');
});

//***********
//** NEW   **
//***********
router.get('/contracts/new', getUser, function (req, res, next) {
  res.render('contracts/new', {user: res.locals.user_id, item: res.locals.item_id})
})
//***********
//** SHOW  **
//***********
router.get('/contracts/:contractId', function (req, res, next) {
  db.Contracts.findById(req.params.contractId).then(function (contract) {
    res.render('contracts/show', {contract: contract});
  });
});
//***********
//** EDIT **
//***********
router.get('/contracts/:contractId/edit', function (req, res, next) {
  db.Contracts.findById(req.params.contractId).then(function (contract) {
    res.render('contracts/edit', {contract:contract});
  });
});
//***********
//** CREATE**
//***********
router.post('/contracts', getUser, function (req, res, next) {
  db.Contracts.create({
    itemId: res.locals.item_id,
    buyerId: req.session.user,
    sellerId: res.locals.user_id,
    startDate: req.body.endDate,
    endDate: req.body.endDate
  }).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
  });
});
//***********
//** UPDATE**
//***********
router.post('/contracts/:contractId', getUser, function (req, res, next) {
  db.Contracts.findByIdAndUpdate(req.params.contractId, {
    startDate: req.body.endDate,
    endDate: req.body.endDate
  }).then(function (result) {
    res.redirect('/users/'+res.locals.user_id+'/items/'+res.locals.item_id+'/contracts/'+result._id);
  });
});
//***********
//** DELETE**
//***********
router.post('/contracts/:contractId/delete', getUser, function (req, res, next) {
  db.Contracts.findByIdAndRemove(req.params.contractId).then(function () {
    res.redirect('/users/'+req.session.user+'/contracts');
  })
})



module.exports = router;
