"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var generic_storage_1 = require('../generic-storage');
var LeagueStorage = (function (_super) {
    __extends(LeagueStorage, _super);
    function LeagueStorage(tableName) {
        _super.call(this, tableName);
    }
    LeagueStorage.prototype.insert = function (league) {
        league.leagueId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", league.leagueId)
            .set("league_name", league.name)
            .setFields(this.createdTimestamps())
            .toString();
        return this.db.none(sql);
    };
    LeagueStorage.prototype.update = function (league) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set("league_name", league.name)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", league.leagueId)
            .toString();
        return this.db.none(sql);
    };
    return LeagueStorage;
}(generic_storage_1.GenericStorage));
exports.LeagueStorage = LeagueStorage;
