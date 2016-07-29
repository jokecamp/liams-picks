let _ = require('lodash');
let Promise = require('bluebird');
import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { LeagueUser } from '../league-users/model';
import { LeagueStorage, LeagueRow } from './storage';
let storage: LeagueStorage = new LeagueStorage('leagues');

/*
    A league contains many Rounds.
        A round cotains many Games
            A game can have a user pick
*/
export class League extends BaseModel {

    static ROUTE: string = 'leagues';

    leagueId: string;
    name: string;

    users: LeagueUser[];

    populateFromRow(row: any) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.leagueId = row.id;
        this.name = row.league_name;
        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);

        this.addLink(Link.REL_SELF, [League.ROUTE, this.leagueId]);
    }

    create() {
        logger.info('League: create');
        let item: League = this;
        return storage.insert(item).then(function() {
            return League.getById(item.leagueId);
        });
    }

    update() {
        logger.info('League: update');
        let item = this;
        return storage.update(item).then(function() {
            return League.getById(item.leagueId);
        });
    }

    /* Static Methods */
    static parseFromReq(req: express.Request) {
        let league = new League();

        if (req.params && req.params.leagueId) {
            league.leagueId = req.params.leagueId;
        }

        league.name = req.body.name;
        return league;
    }

    static fromRow(row: LeagueRow) {
        if (row === null) return null;

        var league = new League();
        league.populateFromRow(row);
        return league;
    }

    static fromRows(rows: LeagueRow[]) {
        return _.map(rows, League.fromRow);
    }

    static getAll() {
        logger.info('League: getAll');
        return storage.getAll().then(League.fromRows);
    }

    static getById(id: string) {
        logger.info('League: getById', id);

        var getById = storage.getById(id).then(League.fromRow);
        var getUsers = LeagueUser.getAllByLeague(id);

        var joinPromises = function(league: League, users: LeagueUser[]) {
            league.users = users;
            return league;
        };

        return Promise.join(getById, getUsers, joinPromises);
    }

    static deleteById(id: string) {
        logger.info('League: deleteById', id);
        return storage.deleteById(id);
    }
}
