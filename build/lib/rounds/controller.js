"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var RoundController = (function () {
    function RoundController() {
    }
    RoundController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.Round.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    RoundController.prototype.postItem = function (req, res, next) {
        var round = model_1.Round.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return round.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    RoundController.prototype.putItemById = function (req, res, next) {
        var round = model_1.Round.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return round.update()
            .then(resWithItem)
            .catch(next);
    };
    RoundController.prototype.getItemById = function (req, res, next) {
        var id = req.params.roundId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.Round.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    RoundController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.roundId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.Round.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return RoundController;
}());
exports.RoundController = RoundController;
