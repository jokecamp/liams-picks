let CONFIG = require('config');
let uuid = require('node-uuid');

import * as logger from 'winston';
import * as Models from '../models';

//var url = CONFIG.db.url;
var url = 'postgres://apiuser:apiuser@localhost/football';

var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');

export function insert(league: Models.League) {

    league.leagueId = uuid.v4();

    var sql = squel.insert()
        .into("games")
        .set("id", league.leagueId)
        .set("name", league.name)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .toString();

    return db.none(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}
