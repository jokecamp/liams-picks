"use strict";
var CONFIG = require('config');
var express = require('express');
var controller = require('./controller');
var router = express.Router();
router.get('/', controller.getRoot);
module.exports = router;
