"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var LeagueUserController = (function () {
    function LeagueUserController() {
    }
    LeagueUserController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.LeagueUser.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    LeagueUserController.prototype.postItem = function (req, res, next) {
        var league = model_1.LeagueUser.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return league.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    LeagueUserController.prototype.putItemById = function (req, res, next) {
        var league = model_1.LeagueUser.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return league.update()
            .then(resWithItem)
            .catch(next);
    };
    LeagueUserController.prototype.getItemById = function (req, res, next) {
        var id = req.params.leagueId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.LeagueUser.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    LeagueUserController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.leagueId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.LeagueUser.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return LeagueUserController;
}());
exports.LeagueUserController = LeagueUserController;
