"use strict";
var CONFIG = require('config');
var model_1 = require('./model');
function getLeagues(req, res, next) {
    return model_1.League.getAll().then(function (items) {
        return res.json(items);
    });
}
exports.getLeagues = getLeagues;
;
function postLeague(req, res, next) {
    var league = new model_1.League();
    league.name = req.body.name;
    return league.create()
        .then(function () {
        return res.json(league);
    });
    ;
}
exports.postLeague = postLeague;
;
