var express = require('express');
var router = express.Router();
var auth = require('./../lib/authorization');
var db = require('./../controllers/contract_controller');

//NEW
router.get('/contracts/new', db.newpage)

//SHOW
router.get('/contracts/:contractId', auth.contractMember, db.show);

//EDIT
router.get('/contracts/:contractId/edit', auth.contractMember, db.edit);

//CREATE
router.post('/contracts', db.create);

//UPDATE
router.post('/contracts/:contractId', auth.contractMember, db.update);

//DELETE
router.post('/contracts/:contractId/delete', auth.contractMember, db.destroy);
//APPROVE
router.post('/contracts/:contractId/approve', auth.contractMember, db.approve);

module.exports = router;
