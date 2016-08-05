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
    number: 'number',
    deadline_at: 'deadline_at'
};
var RoundRow = (function () {
    function RoundRow() {
    }
    return RoundRow;
}());
exports.RoundRow = RoundRow;
var RoundStorage = (function (_super) {
    __extends(RoundStorage, _super);
    function RoundStorage(tableName) {
        _super.call(this, tableName);
    }
    RoundStorage.prototype.getAllByLeague = function (leagueId) {
        var sql = this.squel.select()
            .from(this.tableName)
            .where('league_id = ?', leagueId)
            .where('deleted_at IS NULL')
            .toString();
        logger.info(sql);
        return this.db.query(sql);
    };
    RoundStorage.prototype.insert = function (round) {
        round.roundId = this.generateUuid();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, round.roundId)
            .set(columns.league_id, round.leagueId || null)
            .set(columns.number, round.number || null)
            .set(columns.deadline_at, round.deadline || null)
            .setFields(this.createdTimestamps())
            .toString();
        logger.info(sql);
        return this.db.none(sql)
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    RoundStorage.prototype.update = function (round) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.league_id, round.leagueId || null)
            .set(columns.number, round.number || null)
            .set(columns.deadline_at, round.deadline || null)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", round.roundId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return RoundStorage;
}(storage_1.BaseStorage));
exports.RoundStorage = RoundStorage;
