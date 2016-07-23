let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { LeagueStorage } from './storage';
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
        league.name = req.body.name;
        return league;
    }

    static fromRow(row: Object) {
        var league = new League();
        league.populateFromRow(row);
        return league;
    }

    static getAll() {
        logger.info('League: getAll');
        return storage.getAll().then(function(rows: Object[]) {
            return _.map(rows, function(row: Object) {
                return League.fromRow(row);
            });
        });
    }

    static getById(id: string) {
        logger.info('League: getById', id);
        return storage.getById(id)
            .then(function(row: Object) {
                if (row === null) return null;
                return League.fromRow(row);
            });
    }

    static deleteById(id: string) {
        logger.info('League: deleteById', id);
        return storage.deleteById(id);
    }
}
