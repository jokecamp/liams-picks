"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var logger = require('winston');
var storage_1 = require('../bases/storage');
var UserStorage = (function (_super) {
    __extends(UserStorage, _super);
    function UserStorage(tableName) {
        _super.call(this, tableName);
    }
    UserStorage.prototype.insert = function (user) {
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
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    UserStorage.prototype.update = function (user) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set("username", user.name)
            .set("email", user.email)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", user.userId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return UserStorage;
}(storage_1.BaseStorage));
exports.UserStorage = UserStorage;
