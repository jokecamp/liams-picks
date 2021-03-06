"use strict";
var express = require('express');
var controller_1 = require('./controller');
var router = express.Router();
var controller = new controller_1.LeagueUserController();
router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:leagueUserId', controller.getItemById);
router.put('/:leagueUserId', controller.putItemById);
router.delete(':leagueUserId', controller.deleteItemById);
module.exports = router;
