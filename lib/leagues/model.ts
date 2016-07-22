import * as express from "express";

import { DatedRecord } from '../models';
import * as storage from './storage';

/*
    A league contains many Rounds.
        A round cotains many Games
            A game can have a user pick
*/
export class League extends DatedRecord {

    leagueId: string;
    name: string;

    parseFromReq(req: express.Request) {
        this.name = req.body.name;
    }

    populateFromRow(row: any) {
        this.leagueId = row.id;
        this.name = row.namee;

        // load the inherited class DatedRecord fromRow
        super.populateFromRow(row);
    }

    create() {
        return storage.insert(this);
    }

    /* Static Methods */
    static getAll() {
        return storage.getAll();
    }
}
