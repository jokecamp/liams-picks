"use strict";
var express = require('express');
var controller_1 = require('./controller');
var router = express.Router();
var controller = new controller_1.LeagueController();
router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:leagueId', controller.getItemById);
router.put('/:leagueId', controller.putItemById);
router.delete('/:leagueId', controller.deleteItemById);
module.exports = router;
