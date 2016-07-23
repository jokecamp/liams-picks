"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
var LeagueController = (function () {
    function LeagueController() {
    }
    LeagueController.prototype.getItems = function (req, res, next) {
        return model_1.League.getAll()
            .then(function (items) {
            return res.json(items);
        }).catch(next);
    };
    ;
    LeagueController.prototype.postItem = function (req, res, next) {
        var league = model_1.League.parseFromReq(req);
        return league.create()
            .then(function (inserted) {
            return res.json(inserted);
        }).catch(next);
    };
    ;
    LeagueController.prototype.putItemById = function (req, res, next) {
        var league = model_1.League.parseFromReq(req);
        return league.update()
            .then(function (item) {
            return res.json(item);
        }).catch(next);
    };
    LeagueController.prototype.getItemById = function (req, res, next) {
        var id = req.params.leagueId;
        return model_1.League.getById(id)
            .then(function (item) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        }).catch(next);
    };
    LeagueController.prototype.deleteItemById = function (req, res, next) {
        var id = req.params.leagueId;
        return model_1.League.deleteById(id)
            .then(function () {
            return res.json({});
        }).catch(next);
    };
    return LeagueController;
}());
exports.LeagueController = LeagueController;
