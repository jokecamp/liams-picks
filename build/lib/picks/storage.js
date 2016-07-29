"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var logger = require('winston');
var storage_1 = require('../bases/storage');
var PicksStorage = (function (_super) {
    __extends(PicksStorage, _super);
    function PicksStorage(tableName) {
        _super.call(this, tableName);
    }
    PicksStorage.prototype.insert = function (pick) {
        pick.pickId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", pick.pickId)
            .set("game_id", pick.gameId || null)
            .set("user_id", pick.userId || null)
            .set("home_score", pick.home.score)
            .set("away_score", pick.away.score)
            .set("is_bonus", pick.isBonus || false)
            .set("points_earned", pick.pointsEarned || null)
            .setFields(this.createdTimestamps())
            .toString();
        logger.info(sql);
        return this.db.none(sql)
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    PicksStorage.prototype.update = function (pick) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set("game_id", pick.gameId || null)
            .set("user_id", pick.userId || null)
            .set("home_score", pick.home.score)
            .set("away_score", pick.away.score)
            .set("is_bonus", pick.isBonus || false)
            .set("points_earned", pick.pointsEarned || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", pick.pickId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return PicksStorage;
}(storage_1.BaseStorage));
exports.PicksStorage = PicksStorage;
