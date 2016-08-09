let _ = require('lodash');
let shortid = require('shortid');

import * as logger from 'winston';
import * as express from "express";
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { UserStorage, UserRow } from './storage';
let storage: UserStorage = new UserStorage('users');

export class User extends BaseModel {
    static ROUTE: string = 'users';

    userId: string;
    name: string;
    email: string;

    // secret
    token: string;

    constructor() {
        super();
        this.userId = null;
        this.name = null;
        this.email = null;
        this.token = '';
    }
    populateFromRow(row: UserRow) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.userId = row.id;
        this.name = row.username;
        this.email = row.email;
        this.token = row.token;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [User.ROUTE, this.userId]);
    }

    createToken() {
        this.token = shortid.generate().toLowerCase();
    }

    create() {
        logger.info('User: create');
        let item: User = this;
        item.createToken();
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
        let uuser = new User();

        if (req.params && req.params.userId) {
            uuser.userId = req.params.userId;
        }

        uuser.name = req.body.name;
        uuser.email = req.body.email;
        return uuser;
    }

    static fromRow(row: UserRow) {
        if (row === null) return null;

        var round = new User();
        round.populateFromRow(row);
        return round;
    }

    static fromRows(rows: UserRow[]) {
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
