"use strict";
var CONFIG = require('config');
var model_1 = require('./model');
function getGames(req, res, next) {
    return model_1.Game.getAll()
        .then(function (items) {
        return res.json(items);
    }).catch(next);
}
exports.getGames = getGames;
;
