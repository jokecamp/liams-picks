"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var logger = require('winston');
var storage_1 = require('../bases/storage');
var columns = {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password'
};
var UserRow = (function () {
    function UserRow() {
    }
    return UserRow;
}());
exports.UserRow = UserRow;
var UserStorage = (function (_super) {
    __extends(UserStorage, _super);
    function UserStorage(tableName) {
        _super.call(this, tableName);
    }
    UserStorage.prototype.insert = function (user) {
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
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    UserStorage.prototype.update = function (user) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.username, user.name)
            .set(columns.email, user.email)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", user.userId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return UserStorage;
}(storage_1.BaseStorage));
exports.UserStorage = UserStorage;
