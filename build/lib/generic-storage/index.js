"use strict";
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var pgp = require('pg-promise')();
var db = pgp(CONFIG.db.url);
var squel = require('squel').useFlavour('postgres');
var GenericStorage = (function () {
    function GenericStorage(tableName) {
        this.tableName = tableName;
        this.db = db;
        this.squel = squel;
    }
    GenericStorage.prototype.generateUuid = function () {
        return uuid.v4();
    };
    GenericStorage.prototype.getById = function (id) {
        var sql = squel.select()
            .from(this.tableName)
            .where("id = ?", id)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return db.oneOrNone(sql, [id]);
    };
    GenericStorage.prototype.getAll = function () {
        var sql = squel.select()
            .from(this.tableName)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return db.query(sql);
    };
    GenericStorage.prototype.deleteById = function (id) {
        if (id === null)
            throw new Error('Id to delete is null.');
        if (id === '')
            throw new Error('Id to delete is empty/blank.');
        var sql = squel.update()
            .table(this.tableName)
            .set('deleted_at', squel.str('CURRENT_TIMESTAMP'))
            .setFields(this.udpatedTimestamps())
            .where("id = ?", id)
            .toString();
        logger.info(sql);
        return db.none(sql);
    };
    GenericStorage.prototype.createdTimestamps = function () {
        var timestamps = {
            'created_at': this.squel.str('CURRENT_TIMESTAMP'),
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };
        return timestamps;
    };
    GenericStorage.prototype.udpatedTimestamps = function () {
        var timestamps = {
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };
        return timestamps;
    };
    return GenericStorage;
}());
exports.GenericStorage = GenericStorage;
