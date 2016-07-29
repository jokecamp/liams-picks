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
    game_id: 'game_id',
    user_id: 'user_id',
    home_score: 'home_score',
    away_score: 'away_score',
    is_bonus: 'is_bonus',
    points_earned: 'points_earned'
};
var PickRow = (function () {
    function PickRow() {
    }
    return PickRow;
}());
exports.PickRow = PickRow;
var PicksStorage = (function (_super) {
    __extends(PicksStorage, _super);
    function PicksStorage(tableName) {
        _super.call(this, tableName);
    }
    PicksStorage.prototype.insert = function (pick) {
        pick.pickId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, pick.pickId)
            .set(columns.game_id, pick.gameId || null)
            .set(columns.user_id, pick.userId || null)
            .set(columns.home_score, pick.home.score)
            .set(columns.away_score, pick.away.score)
            .set(columns.is_bonus, pick.isBonus || false)
            .set(columns.points_earned, pick.pointsEarned || null)
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
            .set(columns.game_id, pick.gameId || null)
            .set(columns.user_id, pick.userId || null)
            .set(columns.home_score, pick.home.score)
            .set(columns.away_score, pick.away.score)
            .set(columns.is_bonus, pick.isBonus || false)
            .set(columns.points_earned, pick.pointsEarned || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", pick.pickId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return PicksStorage;
}(storage_1.BaseStorage));
exports.PicksStorage = PicksStorage;
