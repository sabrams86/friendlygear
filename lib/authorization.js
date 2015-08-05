var db = require('./../models');

var authorizeUser = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(req.params.userId).then(function (user) {
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
var authorizeOwner = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(res.locals.owner_id).then(function (user) {
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
var contractMember = function (req, res, next) {
  if (req.session.user) {
    db.Contracts.findById(req.params.contractId).then(function (contract) {
      if(req.session.user === contract.buyerId || req.session.user === contract.sellerId){
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


var getUser = function (req, res, next) {
  db.Users.findById(res.locals.user_id).then(function (user) {
    res.locals.user = user;
    next();
  });
}

module.exports.authorizeUser = authorizeUser;
module.exports.authorizeOwner = authorizeOwner;
module.exports.contractMember = contractMember;
module.exports.getUser = getUser;
