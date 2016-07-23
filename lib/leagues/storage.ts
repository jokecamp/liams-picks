let CONFIG = require('config');

import * as logger from 'winston';
import { League } from './model';
import { BaseStorage } from '../bases/storage';

export class LeagueStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(league: League) {

        league.leagueId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", league.leagueId)
            .set("league_name", league.name)
            .setFields(this.createdTimestamps())
            .toString();

        return this.db.none(sql);
    }

    update(league: League) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set("league_name", league.name)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();

        return this.db.none(sql);
    }

}
