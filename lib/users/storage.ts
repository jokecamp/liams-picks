let CONFIG = require('config');

import * as logger from 'winston';
import { User } from './model';
import { BaseStorage } from '../bases/storage';

let columns = {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password'
};

export class UserRow {
    id: string;
    username: string;
    email: string;
    password: string;
}

export class UserStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(user: User) {

        user.userId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, user.userId)
            .set(columns.username, user.name)
            .set(columns.email, user.email)
            .set(columns.password, user.password)
            .setFields(this.createdTimestamps())
            .toString();

        logger.info(sql);
        return this.db.none(sql)
            .catch(function(err: any) {
                logger.error(err);
                return err;
            });
    }

    update(user: User) {

        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.username, user.name)
            .set(columns.email, user.email)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", user.userId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
