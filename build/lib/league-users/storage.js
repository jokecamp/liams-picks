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
    league_id: 'league_id',
    user_id: 'user_id',
    is_admin: 'is_admin'
};
var LeagueUserRow = (function () {
    function LeagueUserRow() {
    }
    return LeagueUserRow;
}());
exports.LeagueUserRow = LeagueUserRow;
var LeagueUserStorage = (function (_super) {
    __extends(LeagueUserStorage, _super);
    function LeagueUserStorage(tableName) {
        _super.call(this, tableName);
    }
    LeagueUserStorage.prototype.getAllByLeague = function (leagueId) {
        var sql = this.squel.select()
            .from(this.tableName)
            .where('league_id = ?', leagueId)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return this.db.query(sql);
    };
    LeagueUserStorage.prototype.insert = function (leagueUser) {
        leagueUser.leagueUserId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, leagueUser.leagueUserId)
            .set(columns.league_id, leagueUser.leagueId)
            .set(columns.user_id, leagueUser.userId)
            .set(columns.is_admin, leagueUser.isAdmin)
            .setFields(this.createdTimestamps())
            .toString();
        return this.db.none(sql);
    };
    LeagueUserStorage.prototype.update = function (league) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.league_id, league.leagueId)
            .set(columns.user_id, league.userId)
            .set(columns.is_admin, league.isAdmin)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();
        return this.db.none(sql);
    };
    return LeagueUserStorage;
}(storage_1.BaseStorage));
exports.LeagueUserStorage = LeagueUserStorage;
