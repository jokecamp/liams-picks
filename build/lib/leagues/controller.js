"use strict";
var CONFIG = require('config');
var Models = require('../models');
var storage = require('./storage');
function getLeagues(req, res, next) {
    return storage.getAll().then(function (items) {
        return res.json(items);
    });
}
exports.getLeagues = getLeagues;
;
function postLeague(req, res, next) {
    var league = new Models.League();
    league.name = req.body.name;
    return storage.insert(league)
        .then(function () {
        return res.json(league);
    });
    ;
}
exports.postLeague = postLeague;
;
