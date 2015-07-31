var express = require('express');
var router = express.Router();
var auth = require('./../lib/authorization');
var db = require('./../controllers/contract_controller');

//INDEX **
router.get('/contracts', db.index);

//NEW
router.get('/contracts/new', auth.getUser, db.newpage)

//SHOW
router.get('/contracts/:contractId', db.show);

//EDIT
router.get('/contracts/:contractId/edit', db.edit);

//CREATE
router.post('/contracts', auth.getUser, db.create);

//UPDATE
router.post('/contracts/:contractId', auth.getUser, db.update);

//DELETE
router.post('/contracts/:contractId/delete', auth.getUser, db.destroy);

module.exports = router;
