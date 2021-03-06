"use strict";
var express = require('express');
var controller_1 = require('./controller');
var router = express.Router();
var controller = new controller_1.GameController();
router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:gameId', controller.getItemById);
router.put('/:gameId', controller.putItemById);
router.delete('/:gameId', controller.deleteItemById);
module.exports = router;
