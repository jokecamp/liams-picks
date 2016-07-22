"use strict";
var express = require('express');
var controller = require('./controller');
var router = express.Router();
router.get('/', controller.getLeagues);
router.post('/', controller.postLeague);
module.exports = router;
