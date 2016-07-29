let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { UserStorage } from './storage';
let storage: UserStorage = new UserStorage('users');

export class User extends BaseModel {
    static ROUTE: string = 'users';

    userId: string;
    name: string;
    email: string;

    constructor() {
        super();
        this.userId = null;
        this.name = null;
        this.email = null;
    }
    populateFromRow(row: any) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.userId = row.id;
        this.name = row.name;
        this.email = row.email;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [User.ROUTE, this.userId]);
    }

    create() {
        logger.info('User: create');
        let item: User = this;
        return storage.insert(item).then(function() {
            return User.getById(item.userId);
        });
    }

    update() {
        logger.info('User: update');
        let item = this;
        return storage.update(item).then(function() {
            return User.getById(item.userId);
        });
    }

    /* Statics */
    static parseFromReq(req: express.Request) {
        let round = new User();

        if (req.params && req.params.userId) {
            round.userId = req.params.userId;
        }

        round.name = req.body.name;
        round.email = req.body.email;

        return round;
    }

    static fromRow(row: Object) {
        if (row === null) return null;

        var round = new User();
        round.populateFromRow(row);
        return round;
    }

    static fromRows(rows: Object[]) {
        return _.map(rows, User.fromRow);
    }

    static getAll() {
        logger.info('User: getAll');
        return storage.getAll().then(User.fromRows);
    }

    static getById(id: string) {
        logger.info('User: getById', id);
        return storage.getById(id).then(User.fromRow);
    }

    static deleteById(id: string) {
        logger.info('User: deleteById', id);
        return storage.deleteById(id);
    }
}
