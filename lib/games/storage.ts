let CONFIG = require('config');

import * as logger from 'winston';
import { Game } from './model';
import { BaseStorage } from '../bases/storage';

export class GameRow {
    id: string;
    round_id: string;
    scheduled_at: string;
    home_score: number;
    away_score: number;
    home_team: string;
    away_team: string;
    is_final : boolean;
}

export class GameStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(game: Game) {

        game.gameId = this.generateUuid();

        if (!game.when) game.when = null;

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", game.gameId)
            .set("round_id", game.roundId || null)
            .set("scheduled_at", game.when || null)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.createdTimestamps())
            .toString();

        logger.info(sql);
        return this.db.none(sql)
            .catch(function(err: any) {
                logger.error(err);
                return err;
            });
    }

    update(game: Game) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set("round_id", game.roundId || null)
            .set("scheduled_at", game.when || null)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", game.gameId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
