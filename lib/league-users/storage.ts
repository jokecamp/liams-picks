let CONFIG = require('config');

import * as logger from 'winston';
import { LeagueUser } from './model';
import { BaseStorage } from '../bases/storage';

// allow us to use strongly typed column names
// reduce the amount of errors
let columns = {
    id: 'id',
    league_id: 'league_id',
    user_id: 'user_id',
    is_admin: 'is_admin'
};


export class LeagueUserRow {
    id: string;
    league_id: string;
    user_id: string;
    is_admin: boolean;
}

export class LeagueUserStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    getAllByLeague(leagueId: string) {

        var sql = this.squel.select()
            .from(this.tableName)
            .where('league_id = ?', leagueId)
            .where('deleted_at IS NULL')
            .toString();

        logger.info(sql);
        return this.db.query(sql);
    }

    insert(leagueUser: LeagueUser) {

        leagueUser.leagueUserId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, leagueUser.leagueUserId)
            .set(columns.league_id, leagueUser.leagueId)
            .set(columns.user_id, leagueUser.userId)
            .set(columns.is_admin, leagueUser.isAdmin)
            .setFields(this.createdTimestamps())
            .toString();

        return this.db.none(sql);
    }

    update(league: LeagueUser) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.league_id, league.leagueId)
            .set(columns.user_id, league.userId)
            .set(columns.is_admin, league.isAdmin)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();

        return this.db.none(sql);
    }
}
