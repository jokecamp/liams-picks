"use strict";
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var url = CONFIG.db.url;
var pgp = require('pg-promise')();
var db = pgp(url);
var squel = require('squel').useFlavour('postgres');
var DELETED_COLUMN = 'deleted_at';
var UPDATED_COLUMN = 'updated_at';
var CREATED_COLUMN = 'created_at';
var GenericStorage = (function () {
    function GenericStorage(tableName) {
    }
    GenericStorage.prototype.deleteById = function (id) {
        var sql = squel.update()
            .table(this.tableName)
            .set(DELETED_COLUMN, squel.str('CURRENT_TIMESTAMP'))
            .set(CREATED_COLUMN, squel.str('CURRENT_TIMESTAMP'))
            .set(UPDATED_COLUMN, squel.str('CURRENT_TIMESTAMP'))
            .where("id = ?", id)
            .toString();
        return db.none(sql)
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    return GenericStorage;
}());
exports.GenericStorage = GenericStorage;
