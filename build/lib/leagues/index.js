"use strict";
var express = require('express');
var controller = require('./controller');
var router = express.Router();
router.get('/', controller.getLeagues);
router.post('/', controller.postLeague);
router.get('/:leagueId', controller.getById);
module.exports = router;
