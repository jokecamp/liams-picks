"use strict";
var express = require('express');
var controller = require('./controller');
var router = express.Router();
router.get('/', controller.getPicks);
module.exports = router;
