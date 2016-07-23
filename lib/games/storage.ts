let CONFIG = require('config');
let uuid = require('node-uuid');

import * as logger from 'winston';
import { Game } from './model';

//var url = CONFIG.db.url;
var url = 'postgres://apiuser:apiuser@localhost/football';

var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');

export function insert(game: Game) {

    game.gameId = uuid.v4();

    var sql = squel.insert()
        .into("games")
        .set("id", game.gameId)
        //.set("scheduled_at", game.when)
        .set("home_score", game.home.score)
        .set("away_score", game.away.score)
        .set("home_team", game.home.team)
        .set("away_team", game.away.team)
        .set("is_final", game.isFinal || false)
        .set("created_at", squel.str('CURRENT_TIMESTAMP'))
        .set("updated_at", squel.str('CURRENT_TIMESTAMP'))
        .toString();

    return db.none(sql)
        .catch(function(err: any) {
            logger.error(err);
            return err;
        });
}
