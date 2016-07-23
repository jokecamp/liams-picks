"use strict";
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var pgp = require('pg-promise')();
var db = pgp(CONFIG.db.url);
var squel = require('squel').useFlavour('postgres');
var squelDeafults = {
    autoQuoteFieldNames: true,
    nameQuoteCharacter: '"'
};
squel.registerValueHandler(Date, function (date) {
    return pgp.as.date(date);
});
var BaseStorage = (function () {
    function BaseStorage(tableName) {
        this.tableName = tableName;
        this.db = db;
        this.squel = squel;
    }
    BaseStorage.prototype.generateUuid = function () {
        return uuid.v4();
    };
    BaseStorage.prototype.getById = function (id) {
        var sql = squel.select()
            .from(this.tableName)
            .where("id = ?", id)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return db.oneOrNone(sql, [id]);
    };
    BaseStorage.prototype.getAll = function () {
        var sql = squel.select()
            .from(this.tableName)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return db.query(sql);
    };
    BaseStorage.prototype.deleteById = function (id) {
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
    BaseStorage.prototype.createdTimestamps = function () {
        var timestamps = {
            'created_at': this.squel.str('CURRENT_TIMESTAMP'),
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };
        return timestamps;
    };
    BaseStorage.prototype.udpatedTimestamps = function () {
        var timestamps = {
            'updated_at': this.squel.str('CURRENT_TIMESTAMP')
        };
        return timestamps;
    };
    return BaseStorage;
}());
exports.BaseStorage = BaseStorage;
