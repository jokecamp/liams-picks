let _ = require('lodash');
import * as express from "express";
import { BaseModel, Link } from '../models';
import * as storage from './storage';

/*
    A league contains many Rounds.
        A round cotains many Games
            A game can have a user pick
*/
export class League extends BaseModel {

    static ROUTE: string = 'leagues';
    leagueId: string;
    name: string;

    parseFromReq(req: express.Request) {
        this.name = req.body.name;
    }

    populateFromRow(row: any) {
        this.leagueId = row.id;
        this.name = row.namee;
        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);

        this.addLink(Link.REL_SELF, [League.ROUTE, this.leagueId]);
    }

    create() {
        return storage.insert(this);
    }

    /* Static Methods */
    static fromRow(row: Object) {
        var league = new League();
        league.populateFromRow(row);
        return league;
    }

    static getAll() {
        return storage.getAll().then(function(rows: Object[]) {
            return _.map(rows, function(row: Object) {
                return League.fromRow(row);
            });
        });
    }

    static getById(id: string) {
        return storage.getById(id)
            .then(function(row: Object) {
                return League.fromRow(row);
            });
    }
}
