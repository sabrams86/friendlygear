var express = require('express');
var router = express.Router();
var db = require('./../controllers/auth_controller');

router.post('/login', db.loginUser);

router.get('/logout', db.logoutUser);

module.exports = router;
