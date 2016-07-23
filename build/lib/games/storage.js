"use strict";
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var url = 'postgres://apiuser:apiuser@localhost/football';
var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');
function insert(game) {
    game.gameId = uuid.v4();
    var sql = squel.insert()
        .into("games")
        .set("id", game.gameId)
        .set("home_score", game.home.score)
        .set("away_score", game.away.score)
        .set("home_team", game.home.team)
        .set("away_team", game.away.team)
        .set("is_final", game.isFinal || false)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .toString();
    return db.none(sql)
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.insert = insert;
