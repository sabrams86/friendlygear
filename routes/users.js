var express = require('express');
var router = express.Router();
var auth = require('./../lib/authorization');
var db = require('./../controllers/user_controller');

//INDEX
router.get('/users', auth.authorizeUser, db.index);

//NEW
router.get('/users/new', db.newpage);

//SHOW
router.get('/users/:userId', auth.authorizeUser, db.show);

//EDIT
router.get('/users/:userId/edit', auth.authorizeUser, db.edit);

//CREATE
router.post('/users', db.create);

//UPDATE
router.post('/users/:userId', auth.authorizeUser, db.update);

//DELETE
router.post('/users/:userId/delete', auth.authorizeUser, db.destroy);

module.exports = router;
