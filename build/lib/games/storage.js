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
        .set("home_team", game.homeTeam)
        .set("home_score", game.homeScore)
        .set("away_score", game.awayScore)
        .set("home_team", game.homeTeam)
        .set("away_team", game.awayTeam)
        .set("is_final", game.isFinal || false)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .toString();
    return db.none(sql)
        .then(function () {
        logger.info('inserted');
    })
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.insert = insert;
