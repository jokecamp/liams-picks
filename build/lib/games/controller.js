"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var GameController = (function () {
    function GameController() {
    }
    GameController.prototype.getItems = function (req, res, next) {
        return model_1.Game.getAll()
            .then(function (items) {
            return res.json(items);
        }).catch(next);
    };
    ;
    GameController.prototype.postItem = function (req, res, next) {
        var game = model_1.Game.parseFromReq(req);
        return game.create()
            .then(function (inserted) {
            return res.json(inserted);
        }).catch(next);
    };
    ;
    GameController.prototype.putItemById = function (req, res, next) {
        var game = model_1.Game.parseFromReq(req);
        return game.update()
            .then(function (item) {
            return res.json(item);
        }).catch(next);
    };
    GameController.prototype.getItemById = function (req, res, next) {
        var id = req.params.gameId;
        return model_1.Game.getById(id)
            .then(function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        }).catch(next);
    };
    GameController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.gameId;
        return model_1.Game.deleteById(id)
            .then(function () {
            return res.json({});
        }).catch(next);
    };
    return GameController;
}());
exports.GameController = GameController;
