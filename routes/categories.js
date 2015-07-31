var express = require('express');
var router = express.Router();
var db = require('./../controllers/category_controller');

//INDEX
router.get('/categories', db.index);

//CREATE
router.post('/categories', db.create);

module.exports = router;
