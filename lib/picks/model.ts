let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { Link } from '../common-models/link'
import { BaseModel } from '../common-models/base'
import { IResult } from '../common-models/result';

import { PicksStorage } from './storage';
let storage: PicksStorage = new PicksStorage('picks');

export class Pick extends BaseModel implements IResult {

    static ROUTE: string = 'picks';

    pickId: string;
    gameId: string;
    userId: string;

    home: {
        score: number;
    }

    away: {
        score: number;
    }

    isBonus: boolean;
    pointsEarned: number;

    constructor() {
        super();

        this.home = {
            score: null
        };
        this.away = {
            score: null
        };
        this.isBonus = false;
        this.pointsEarned = null;
    }

    populateFromRow(row: any) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.userId = row.user_id;
        this.pickId = row.pick_id;
        this.gameId = row.game_id;
        this.home.score = row.home_score;
        this.away.score = row.away_score;
        this.isBonus = row.is_bonus;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [Pick.ROUTE, this.pickId]);
    }

    create() {
        logger.info('Pick: create');
        let item: Pick = this;
        return storage.insert(item).then(function() {
            return Pick.getById(item.pickId);
        });
    }

    update() {
        logger.info('Pick: update');
        let item = this;
        return storage.update(item).then(function() {
            return Pick.getById(item.pickId);
        });
    }

    /* Static Methods */
    static parseFromReq(req: express.Request) {
        let pick = new Pick();

        if (req.params && req.params.pickId) {
            pick.pickId = req.params.pickId;
        }

        pick.gameId = req.body.gameId;
        pick.userId = req.body.userId;
        pick.home.score = req.body.home.score;
        pick.away.score = req.body.away.score;
        pick.isBonus = req.body.isBonus;
        pick.pointsEarned = req.body.pointsEarned;

        return pick;
    }

    static fromRow(row: Object) {
        if (row === null) return null;

        var pick = new Pick();
        pick.populateFromRow(row);
        return pick;
    }

    static fromRows(rows: Object[]) {
        return _.map(rows, Pick.fromRow);
    }

    static getAll() {
        logger.info('Pick: getAll');
        return storage.getAll().then(Pick.fromRows);
    }

    static getById(id: string) {
        logger.info('Pick: getById', id);
        return storage.getById(id).then(Pick.fromRow);
    }

    static deleteById(id: string) {
        logger.info('Pick: deleteById', id);
        return storage.deleteById(id);
    }
}
