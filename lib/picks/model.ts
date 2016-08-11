let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { Link } from '../common-models/link'
import { BaseModel } from '../common-models/base'
import { IResult } from '../common-models/result';

import { PicksStorage, PickRow } from './storage';
let storage: PicksStorage = new PicksStorage('picks');
import { User } from '../users/model';

export class Pick extends BaseModel implements IResult {

    static ROUTE: string = 'picks';

    pickId: string;
    gameId: string;

    user: User;

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

        this.pickId = null;
        this.home = {
            score: null
        };
        this.away = {
            score: null
        };
        this.isBonus = false;
        this.pointsEarned = null;
        this.user = new User();
    }

    populateFromRow(row: PickRow) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.pickId = row.id;
        this.gameId = row.game_id;
        this.home.score = row.home_score;
        this.away.score = row.away_score;
        this.isBonus = row.is_bonus;

        this.user = new User();
        this.user.userId = row.user_id;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [Pick.ROUTE, this.pickId]);
    }

    // we need to support retreiving a user by id or token
    getUserByPick() {

        let item = this;

        if (item.user.userId > '') {
            return User.getById(item.user.userId)
                .then(function(user: User) {
                    if (user === null) throw new Error('invalid user id')
                    item.user = user;
                });
        }

        return User.getByToken(item.user.token)
            .then(function(user: User) {
                if (user === null) throw new Error('invalid user token')
                item.user = user;
            });
    }

    create() {
        logger.info('Pick: create');
        let item: Pick = this;

        return item.getUserByPick()
            .then(function() {
                return storage.insert(item)
            }).then(function() {
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
        pick.home.score = req.body.home.score;
        pick.away.score = req.body.away.score;
        pick.isBonus = req.body.isBonus;
        pick.pointsEarned = req.body.pointsEarned;

        if (req.body.user) {
            pick.user.userId = req.body.user.userId || null;
            pick.user.token = req.body.user.token || null;
        }

        return pick;
    }

    static fromRow(row: PickRow) {
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
