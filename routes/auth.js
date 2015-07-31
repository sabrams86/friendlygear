var express = require('express');
var router = express.Router();
var db = require('./../models');
var bcrypt = require('bcryptjs');
var db1 = require('./../controllers/auth_controller');

router.post('/login', function (req, res, next) {
  db.Users.findOne({username: req.body.username}).then(function (user) {
    console.log(req.body.password, user.password);
    if (bcrypt.compareSync(req.body.password, user.password)){
      console.log('few');
      req.session.user = user._id;
      res.redirect('/users/'+user._id+'/items');
    } else {
      res.redirect('/', {error: 'Password is incorrect, please try again'});
    }
  }, function (err) {
    res.redirect('/', {flash: 'Username not found, please try again'});
  });
}
);

router.get('/logout', db1.logoutUser);

module.exports = router;
