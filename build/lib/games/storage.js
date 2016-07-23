"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var logger = require('winston');
var storage_1 = require('../bases/storage');
var GameStorage = (function (_super) {
    __extends(GameStorage, _super);
    function GameStorage(tableName) {
        _super.call(this, tableName);
    }
    GameStorage.prototype.insert = function (game) {
        game.gameId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", game.gameId)
            .set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.createdTimestamps())
            .toString();
        return this.db.none(sql)
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    GameStorage.prototype.update = function (game) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set("scheduled_at", game.when)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .setFields(this.udpatedTimestamps())
            .toString();
        return this.db.none(sql);
    };
    return GameStorage;
}(storage_1.BaseStorage));
exports.GameStorage = GameStorage;
