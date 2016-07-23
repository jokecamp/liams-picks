"use strict";
var CONFIG = require('config');
var errors = require('../errors');
var model_1 = require('./model');
function getGames(req, res, next) {
    return model_1.Game.getAll()
        .then(function (items) {
        return res.json(items);
    }).catch(next);
}
exports.getGames = getGames;
;
function postGame(req, res, next) {
    var league = model_1.Game.parseFromReq(req);
    return league.create()
        .then(function (inserted) {
        return res.json(inserted);
    }).catch(next);
}
exports.postGame = postGame;
;
function putById(req, res, next) {
    var league = model_1.Game.parseFromReq(req);
    league.leagueId = req.params.leagueId;
    return league.update()
        .then(function (item) {
        return res.json(item);
    }).catch(next);
}
exports.putById = putById;
function getById(req, res, next) {
    var id = req.params.leagueId;
    return model_1.Game.getById(id)
        .then(function (item) {
        if (item === null) {
            return errors.itemNotFound(req, res, next);
        }
        return res.json(item);
    }).catch(next);
}
exports.getById = getById;
function deleteById(req, res, next) {
    var id = req.params.leagueId;
    return model_1.Game.deleteById(id)
        .then(function () {
        return res.json({});
    }).catch(next);
}
exports.deleteById = deleteById;
