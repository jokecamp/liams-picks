let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { LeagueUserStorage, LeagueUserRow } from './storage';
let storage: LeagueUserStorage = new LeagueUserStorage('league_users');

export class LeagueUser extends BaseModel {

    static ROUTE: string = 'league-users';

    leagueUserId: string;
    userId: string;
    leagueId: string;
    isAdmin: boolean;

    constructor() {
        super();
    }


    create() {
        logger.info('League: create');
        let item: LeagueUser = this;
        return storage.insert(item).then(function() {
            return LeagueUser.getById(item.leagueId);
        });
    }

    update() {
        logger.info('League: update');
        let item = this;
        return storage.update(item).then(function() {
            return LeagueUser.getById(item.leagueId);
        });
    }

    /* Static Methods */
    static parseFromReq(req: express.Request) {
        let leagueUser = new LeagueUser();

        if (req.params && req.params.leagueUserId) {
            leagueUser.leagueUserId = req.params.leagueUserId;
        }

        leagueUser.leagueId = req.body.leagueId;
        leagueUser.userId = req.body.userId;
        leagueUser.isAdmin = req.body.isAdmin;

        return leagueUser;
    }

    populateFromRow(row: LeagueUserRow) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.leagueUserId = row.id;
        this.leagueId = row.league_id;
        this.userId = row.user_id;
        this.isAdmin = row.is_admin;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);

        this.addLink(Link.REL_SELF, [LeagueUser.ROUTE, this.leagueUserId]);
    }

    static fromRow(row: LeagueUserRow) {
        if (row === null) return null;

        var leagueUser = new LeagueUser();
        leagueUser.populateFromRow(row);
        return leagueUser;
    }

    static fromRows(rows: LeagueUserRow[]) {
        return _.map(rows, LeagueUser.fromRow);
    }

    static getAll() {
        logger.info('LeagueUser: getAll');
        return storage.getAll().then(LeagueUser.fromRows);
    }

    static getById(id: string) {
        logger.info('LeagueUser: getById', id);
        return storage.getById(id).then(LeagueUser.fromRow);
    }

    static deleteById(id: string) {
        logger.info('LeagueUser: deleteById', id);
        return storage.deleteById(id);
    }
}
