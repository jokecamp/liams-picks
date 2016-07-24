"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var LeagueController = (function () {
    function LeagueController() {
    }
    LeagueController.prototype.getItems = function (req, res, next) {
        var resWithItems = function (items) {
            return res.json(items);
        };
        return model_1.League.getAll()
            .then(resWithItems)
            .catch(next);
    };
    ;
    LeagueController.prototype.postItem = function (req, res, next) {
        var league = model_1.League.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return league.create()
            .then(resWithItem)
            .catch(next);
    };
    ;
    LeagueController.prototype.putItemById = function (req, res, next) {
        var league = model_1.League.parseFromReq(req);
        var resWithItem = function (inserted) {
            return res.json(inserted);
        };
        return league.update()
            .then(resWithItem)
            .catch(next);
    };
    LeagueController.prototype.getItemById = function (req, res, next) {
        var id = req.params.leagueId;
        var resWithItem = function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };
        return model_1.League.getById(id)
            .then(resWithItem)
            .catch(next);
    };
    LeagueController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.leagueId;
        var resWithOk = function () {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };
        return model_1.League.deleteById(id)
            .then(resWithOk)
            .catch(next);
    };
    return LeagueController;
}());
exports.LeagueController = LeagueController;
