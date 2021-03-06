"use strict";
var express = require('express');
var controller_1 = require('./controller');
var router = express.Router();
var controller = new controller_1.UserController();
router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:userId', controller.getItemById);
router.put('/:userId', controller.putItemById);
router.delete('/:userId', controller.deleteItemById);
module.exports = router;
