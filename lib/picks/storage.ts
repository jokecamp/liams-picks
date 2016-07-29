let CONFIG = require('config');

import * as logger from 'winston';
import { Pick } from './model';
import { BaseStorage } from '../bases/storage';

export class PicksStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(pick: Pick) {

        pick.pickId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", pick.pickId)
            .set("game_id", pick.gameId || null)
            .set("user_id", pick.userId || null)
            .set("home_score", pick.home.score)
            .set("away_score", pick.away.score)
            .set("is_bonus", pick.isBonus || false)
            .set("points_earned", pick.pointsEarned || null)
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
            .set("game_id", pick.gameId || null)
            .set("user_id", pick.userId || null)
            .set("home_score", pick.home.score)
            .set("away_score", pick.away.score)
            .set("is_bonus", pick.isBonus || false)
            .set("points_earned", pick.pointsEarned || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", pick.pickId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
