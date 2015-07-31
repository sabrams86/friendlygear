var express = require('express');
var router = express.Router();
var db = require('./../controllers/index_controller');

router.get('/', db.index);

module.exports = router;
