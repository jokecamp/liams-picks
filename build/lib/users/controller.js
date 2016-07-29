"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.User.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    UserController.prototype.postItem = function (req, res, next) {
        var user = model_1.User.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return user.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    UserController.prototype.putItemById = function (req, res, next) {
        var user = model_1.User.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return user.update()
            .then(resWithItem)
            .catch(next);
    };
    UserController.prototype.getItemById = function (req, res, next) {
        var id = req.params.userId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.User.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    UserController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.userId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.User.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return UserController;
}());
exports.UserController = UserController;
