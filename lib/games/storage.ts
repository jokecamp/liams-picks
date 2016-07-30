let CONFIG = require('config');

import * as logger from 'winston';
import { Game } from './model';
import { BaseStorage } from '../bases/storage';

let columns = {
    id: 'id',
    round_id: 'round_id',
    scheduled_at: 'scheduled_at',
    home_score: 'home_score',
    away_score: 'away_score',
    home_team: 'home_team',
    away_team: 'away_team',
    is_final: 'is_final'
};


export class GameRow {
    id: string;
    round_id: string;
    scheduled_at: string;
    home_score: number;
    away_score: number;
    home_team: string;
    away_team: string;
    is_final: boolean;
}

export class GameStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    getAllByLeague(leagueId: string) {

        var sql = 'select g.* from games g inner join rounds r on r.id = g.round_id where r.league_id = $1';
        logger.info(sql);
        return this.db.query(sql, [leagueId]);
    }


    insert(game: Game) {

        game.gameId = this.generateUuid();

        if (!game.when) game.when = null;

        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, game.gameId)
            .set(columns.round_id, game.roundId || null)
            .set(columns.scheduled_at, game.when || null)
            .set(columns.home_score, game.home.score)
            .set(columns.away_score, game.away.score)
            .set(columns.home_team, game.home.team)
            .set(columns.away_team, game.away.team)
            .set(columns.is_final, game.isFinal || false)
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
            .set(columns.round_id, game.roundId || null)
            .set(columns.scheduled_at, game.when || null)
            .set(columns.home_score, game.home.score)
            .set(columns.away_score, game.away.score)
            .set(columns.home_team, game.home.team)
            .set(columns.away_team, game.away.team)
            .set(columns.is_final, game.isFinal || false)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", game.gameId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
