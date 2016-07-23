let CONFIG = require('config');
let uuid = require('node-uuid');

import * as logger from 'winston';
import { Game } from './model';
import { GenericStorage } from '../generic-storage';

export class GameStorage extends GenericStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(game: Game) {

        game.gameId = uuid.v4();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", game.gameId)
            //.set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .set("created_at", this.squel.str('CURRENT_TIMESTAMP'))
            .set("updated_at", this.squel.str('CURRENT_TIMESTAMP'))
            .toString();

        return this.db.none(sql)
            .catch(function(err: any) {
                logger.error(err);
                return err;
            });
    }

    update(game: Game) {

        var sql = this.squel.update()
            .table(this.tableName)
            //.set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .set("created_at", this.squel.str('CURRENT_TIMESTAMP'))
            .set("updated_at", this.squel.str('CURRENT_TIMESTAMP'))
            .toString();

        return this.db.none(sql);
    }

}
