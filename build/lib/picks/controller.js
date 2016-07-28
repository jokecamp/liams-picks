"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var PickController = (function () {
    function PickController() {
    }
    PickController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.Pick.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    PickController.prototype.postItem = function (req, res, next) {
        var pick = model_1.Pick.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return pick.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    PickController.prototype.putItemById = function (req, res, next) {
        var pick = model_1.Pick.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return pick.update()
            .then(resWithItem)
            .catch(next);
    };
    PickController.prototype.getItemById = function (req, res, next) {
        var id = req.params.pickId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.Pick.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    PickController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.pickId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.Pick.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return PickController;
}());
exports.PickController = PickController;
