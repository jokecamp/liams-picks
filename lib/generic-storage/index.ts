let CONFIG = require('config');
let uuid = require('node-uuid');
import * as logger from 'winston';

let pgp = require('pg-promise')();
let db = pgp(CONFIG.db.url);
let squel = require('squel').useFlavour('postgres');

/*
    Generic Storage Methods and Utilities.
    All storage classes should extend this base class.
*/
export abstract class GenericStorage {

    tableName: string;

    db: any;
    squel: any;

    constructor(tableName: string) {
        this.tableName = tableName;

        // expose db and squel for queries
        this.db = db;
        this.squel = squel;
    }

    // uses v4
    generateUuid() {
        return uuid.v4();
    }

    getById(id: string) {

        var sql = squel.select()
            .from(this.tableName)
            .where("id = ?", id)
            .where('deleted_at IS NULL')
            .toString();

        logger.info(sql);
        return db.oneOrNone(sql, [id]);
    }

    getAll() {

        var sql = squel.select()
            .from(this.tableName)
            .where('deleted_at IS NULL')
            .toString();

        logger.info(sql);
        return db.query(sql);
    }

    /* Assumes Primary key is Id field */
    deleteById(id: string) {

        if (id === null) throw new Error('Id to delete is null.');
        if (id === '') throw new Error('Id to delete is empty/blank.');

        var sql = squel.update()
            .table(this.tableName)
            .set('deleted_at', squel.str('CURRENT_TIMESTAMP'))
            .setFields(this.udpatedTimestamps())
            .where("id = ?", id)
            .toString();

        logger.info(sql);
        return db.none(sql);
    }

    // the timestamps fields to apply when creating (INSERT) records
    createdTimestamps() {
        var timestamps = {
            'created_at': this.squel.str('CURRENT_TIMESTAMP'),
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };

        return timestamps;
    }

    // the timestamps fields to apply when updating (UPDATE) records
    udpatedTimestamps() {
        var timestamps = {
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };

        return timestamps;
    }
}
