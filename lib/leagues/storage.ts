let CONFIG = require('config');

import * as logger from 'winston';
import { League } from './model';
import { BaseStorage } from '../bases/storage';

// allow us to use strongly typed column names
// reduce the amount of errors
let columns = {
    id: 'id',
    league_name: 'league_name'
};


export class LeagueRow {
    id: string;
    League_name: string;
}

export class LeagueStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(league: League) {

        league.leagueId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, league.leagueId)
            .set(columns.league_name, league.name)
            .setFields(this.createdTimestamps())
            .toString();

        return this.db.none(sql);
    }

    update(league: League) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.league_name, league.name)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();

        return this.db.none(sql);
    }
}
