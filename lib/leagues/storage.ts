let CONFIG = require('config');
let uuid = require('node-uuid');

import * as logger from 'winston';
import { League } from './model';

//var url = CONFIG.db.url;
var url = 'postgres://apiuser:apiuser@localhost/football';

var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');

export function insert(league: League) {

    league.leagueId = uuid.v4();

    var sql = squel.insert()
        .into("leagues")
        .set("id", league.leagueId)
        .set("league_name", league.name)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .toString();

    return db.none(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}

export function update(league: League) {

    var sql = squel.update()
        .table("leagues")
        .set("id", league.leagueId)
        .set("league_name", league.name)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .where("id = ?", league.leagueId)
        .toString();

    return db.none(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}

export function getAll() {
    var sql = 'select * from leagues';
    return db.query(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}

export function getById(id: string) {
    var sql = 'select * from leagues where id = $1';
    return db.oneOrNone(sql, [id])
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}

export function deleteById(id: string) {
    var sql = squel.update()
        .table("leagues")
        .set("deleted_at", squel.str('CURRENT_TIMESTAMP'))
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .where("id = ?", id)
        .toString();

    return db.none(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}
