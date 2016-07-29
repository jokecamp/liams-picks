let CONFIG = require('config');

import * as logger from 'winston';
import { Pick } from './model';
import { BaseStorage } from '../bases/storage';

let columns = {
    id: 'id',
    game_id: 'game_id',
    user_id: 'user_id',
    home_score: 'home_score',
    away_score: 'away_score',
    is_bonus: 'is_bonus',
    points_earned: 'points_earned'
};

export class PickRow {
    id: string;
    game_id: string;
    user_id: string;
    home_score: number;
    away_score: number;
    is_bonus: boolean;
    points_earned: number;
}

export class PicksStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(pick: Pick) {

        pick.pickId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, pick.pickId)
            .set(columns.game_id, pick.gameId || null)
            .set(columns.user_id, pick.userId || null)
            .set(columns.home_score, pick.home.score)
            .set(columns.away_score, pick.away.score)
            .set(columns.is_bonus, pick.isBonus || false)
            .set(columns.points_earned, pick.pointsEarned || null)
            .setFields(this.createdTimestamps())
            .toString();

        logger.info(sql);
        return this.db.none(sql)
            .catch(function(err: any) {
                logger.error(err);
                return err;
            });
    }

    update(pick: Pick) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.game_id, pick.gameId || null)
            .set(columns.user_id, pick.userId || null)
            .set(columns.home_score, pick.home.score)
            .set(columns.away_score, pick.away.score)
            .set(columns.is_bonus, pick.isBonus || false)
            .set(columns.points_earned, pick.pointsEarned || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", pick.pickId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
