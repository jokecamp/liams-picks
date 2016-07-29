let CONFIG = require('config');

import * as logger from 'winston';
import { User } from './model';
import { BaseStorage } from '../bases/storage';

export class UserStorage extends BaseStorage {

    constructor(tableName: string) {
        super(tableName);
    }

    insert(user: User) {

        user.userId = this.generateUuid();

        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", user.userId)
            .set("username", user.name)
            .set("email", user.email)
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
            .set("username", user.name)
            .set("email", user.email)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", user.userId)
            .toString();

        logger.info(sql);
        return this.db.none(sql);
    }

}
