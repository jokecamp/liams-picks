"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var GameController = (function () {
    function GameController() {
    }
    GameController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.Game.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    GameController.prototype.postItem = function (req, res, next) {
        var game = model_1.Game.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return game.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    GameController.prototype.putItemById = function (req, res, next) {
        var game = model_1.Game.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return game.update()
            .then(resWithItem)
            .catch(next);
    };
    GameController.prototype.getItemById = function (req, res, next) {
        var id = req.params.gameId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.Game.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    GameController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.gameId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.Game.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return GameController;
}());
exports.GameController = GameController;
