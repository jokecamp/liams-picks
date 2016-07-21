"use strict";
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var url = 'postgres://apiuser:apiuser@localhost/football';
var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');
function insert(league) {
    league.leagueId = uuid.v4();
    var sql = squel.insert()
        .into("games")
        .set("id", league.leagueId)
        .set("name", league.name)
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
