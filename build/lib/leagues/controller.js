"use strict";
var CONFIG = require('config');
function getLeagues(req, res, next) {
    var leagues = [];
    return res.json(leagues);
}
exports.getLeagues = getLeagues;
;
function postLeague(req, res, next) {
    var leagues = [];
    return res.json(leagues);
}
exports.postLeague = postLeague;
;
