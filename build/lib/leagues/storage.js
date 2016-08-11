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
    league_name: 'league_name'
};
var LeagueRow = (function () {
    function LeagueRow() {
    }
    return LeagueRow;
}());
exports.LeagueRow = LeagueRow;
var LeagueStorage = (function (_super) {
    __extends(LeagueStorage, _super);
    function LeagueStorage(tableName) {
        _super.call(this, tableName);
    }
    LeagueStorage.prototype.insert = function (league) {
        league.leagueId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, league.leagueId)
            .set(columns.league_name, league.name)
            .setFields(this.createdTimestamps())
            .toString();
        return this.db.none(sql);
    };
    LeagueStorage.prototype.update = function (league) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.league_name, league.name)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();
        return this.db.none(sql);
    };
    LeagueStorage.prototype.getUserLeagues = function (userId) {
        var sql = 'select le.* from leagues le inner join league_users lu on lu.league_id = le.id where lu.user_id = $1';
        logger.info(sql);
        return this.db.query(sql, [userId]);
    };
    return LeagueStorage;
}(storage_1.BaseStorage));
exports.LeagueStorage = LeagueStorage;
