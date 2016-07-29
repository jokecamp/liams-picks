let CONFIG = require('config');

import * as logger from 'winston';
import { Round } from './model';
import { BaseStorage } from '../bases/storage';

export class RoundRow {
    id: string;
    league_id: string;
    num: number;
}

export class RoundStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(round: Round) {

        round.roundId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", round.roundId)
            .set("league_id", round.leagueId || null)
            .set("num", round.number || null)
            .setFields(this.createdTimestamps())
            .toString();

        logger.info(sql);
        return this.db.none(sql)
            .catch(function(err: any) {
                logger.error(err);
                return err;
            });
    }

    update(round: Round) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set("league_id", round.leagueId || null)
            .set("num", round.number || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", round.roundId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
