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
        .into("leagues")
        .set("id", league.leagueId)
        .set("league_name", league.name)
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
function update(league) {
    var sql = squel.update()
        .table("leagues")
        .set("id", league.leagueId)
        .set("league_name", league.name)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .where("id = ?", league.leagueId)
        .toString();
    return db.none(sql)
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.update = update;
function getAll() {
    var sql = 'select * from leagues';
    return db.query(sql)
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.getAll = getAll;
function getById(id) {
    var sql = 'select * from leagues where id = $1';
    return db.oneOrNone(sql, [id])
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.getById = getById;
function deleteById(id) {
    var sql = squel.update()
        .table("leagues")
        .set("deleted_at", squel.str('CURRENT_TIMESTAMP'))
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .where("id = ?", id)
        .toString();
    return db.none(sql)
        .catch(function (err) {
        logger.error(err);
        return err;
    });
}
exports.deleteById = deleteById;
