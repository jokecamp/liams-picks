"use strict";
var CONFIG = require('config');
var model_1 = require('./model');
function getLeagues(req, res, next) {
    return model_1.League.getAll()
        .then(function (items) {
        return res.json(items);
    }).catch(next);
}
exports.getLeagues = getLeagues;
;
function postLeague(req, res, next) {
    var league = model_1.League.parseFromReq(req);
    return league.create()
        .then(function (inserted) {
        return res.json(inserted);
    }).catch(next);
}
exports.postLeague = postLeague;
;
function putById(req, res, next) {
    var league = model_1.League.parseFromReq(req);
    league.leagueId = req.params.leagueId;
    return league.update()
        .then(function (item) {
        return res.json(item);
    }).catch(next);
}
exports.putById = putById;
function getById(req, res, next) {
    var id = req.params.leagueId;
    return model_1.League.getById(id)
        .then(function (item) {
        return res.json(item);
    }).catch(next);
}
exports.getById = getById;
function deleteById(req, res, next) {
    var id = req.params.leagueId;
    return model_1.League.deleteById(id)
        .then(function () {
        return res.json({});
    }).catch(next);
}
exports.deleteById = deleteById;
