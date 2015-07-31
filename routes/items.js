var express = require('express');
var router = express.Router();
var auth = require('./../lib/authorization');
var db = require('./../controllers/item_controller');

//INDEX
router.get('/items', auth.getUser, db.index);

//NEW
router.get('/items/new', db.newpage);

//SHOW
router.get('/items/:itemId', db.show);

//EDIT
router.get('/items/:itemId/edit', auth.authorizeUser, db.edit);

//CREATE
router.post('/items', db.create);

//UPDATE
router.post('/items/:itemId', auth.authorizeUser, db.update);

//DELETE
router.post('/items/:itemId/delete', auth.authorizeUser, db.destroy);

module.exports = router;
