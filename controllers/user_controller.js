var dblib = require('./../lib/db_lib');

var index = function(req, res, next) {
  dblib.findAllUsers().then(function (results) {
    res.render('users/index', {users: results, flash: req.flash('flash'), user_id: req.session.user});
  });
}

var newpage = function (req, res, next) {
  res.render('users/new');
}

var show = function(req, res, next) {
  dblib.findOneUser(req.params.userId).then(function (result) {
    res.render('users/show', {user: result,  user_id: req.session.user});
  });
}

var edit = function(req, res, next) {
  dblib.findOneUser(req.params.userId).then(function (result) {
    res.render('users/edit', {user: result, user_id: req.session.user});
  });
}

var create = function(req, res, next) {
  dblib.validateUser(req.body.user).then(function () {
    dblib.createUser(req.body.user).then(function (result) {
      req.session.user = result._id;
      res.redirect('/users/'+result._id+'/items');
    });
  }, function (errors) {
    res.render('users/new', {user: req.body.user, errors: errors});
  });
}

var update = function(req, res, next) {
  dblib.validateUserUpdate(req.body.user).then(function () {
    dblib.findOneUser(req.params.userId).then(function (user) {
      dblib.updateUser(req.body.user, user.password).then(function (result) {
        res.redirect('/users/'+req.params.userId);
      })
    })
  }, function(errors) {
    res.render('users/edit', {user_id: req.params.userId, user: req.body.user, errors: errors});
  });
}

var destroy = function(req, res, next) {
  dblib.removeItemsByUser(req.params.userId).then(dblib.removeContractsByUser(req.params.userId))
  .then(dblib.removeUser(req.params.userId)).then(function () {
    req.session = null;
    res.redirect('/');
  });
}
module.exports.index = index;
module.exports.newpage = newpage;
module.exports.show = show;
module.exports.create = create;
module.exports.edit = edit;
module.exports.update = update;
module.exports.destroy = destroy;
