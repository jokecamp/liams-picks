let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { RoundStorage } from './storage';
let storage: RoundStorage = new RoundStorage('rounds');

export class Round extends BaseModel {
    static ROUTE: string = 'rounds';

    roundId: string;
    leagueId: string;
    number: number;

    constructor() {
        super();
        this.roundId = null;
        this.leagueId = null;
        this.number = null;
    }
    populateFromRow(row: any) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.roundId = row.id;
        this.leagueId = row.league_id;
        this.number = row.num;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [Round.ROUTE, this.roundId]);
    }

    create() {
        logger.info('Round: create');
        let item: Round = this;
        return storage.insert(item).then(function() {
            return Round.getById(item.roundId);
        });
    }

    update() {
        logger.info('Round: update');
        let item = this;
        return storage.update(item).then(function() {
            return Round.getById(item.roundId);
        });
    }

    /* Statics */
    static parseFromReq(req: express.Request) {
        let round = new Round();

        if (req.params && req.params.roundId) {
            round.roundId = req.params.roundId;
        }

        round.leagueId = req.body.leagueId;
        round.number = req.body.number;

        return round;
    }

    static fromRow(row: Object) {
        if (row === null) return null;

        var round = new Round();
        round.populateFromRow(row);
        return round;
    }

    static fromRows(rows: Object[]) {
        return _.map(rows, Round.fromRow);
    }

    static getAll() {
        logger.info('Round: getAll');
        return storage.getAll().then(Round.fromRows);
    }

    static getById(id: string) {
        logger.info('Round: getById', id);
        return storage.getById(id).then(Round.fromRow);
    }

    static deleteById(id: string) {
        logger.info('Round: deleteById', id);
        return storage.deleteById(id);
    }
}
