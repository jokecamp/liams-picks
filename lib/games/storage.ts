let CONFIG = require('config');

import * as logger from 'winston';
import { Game } from './model';
import { BaseStorage } from '../bases/storage';

export class GameStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(game: Game) {

        game.gameId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", game.gameId)
            .set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.createdTimestamps())
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
            .set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.udpatedTimestamps())
            .toString();

        return this.db.none(sql);
    }

}
