var express = require('express');
var router = express.Router();
var db = require('./../models');

//***********
//** INDEX **
//***********
router.get('/gear', function(req, res, next) {
  db.Users.findById(req.params.userId).then(function (user) {
    db.Items.find({userId: user._id}).then(function (items) {
      res.render('items/index', {items: items});
    })
  })
});

//***********
//** NEW   **
//***********

//***********
//** SHOW  **
//***********

//***********
//** EDIT **
//***********

//***********
//** CREATE**
//***********

//***********
//** UPDATE**
//***********

//***********
//** DELETE**
//***********




module.exports = router;
