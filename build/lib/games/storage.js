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
    round_id: 'round_id',
    scheduled_at: 'scheduled_at',
    home_score: 'home_score',
    away_score: 'away_score',
    home_team: 'home_team',
    away_team: 'away_team',
    is_final: 'is_final'
};
var GameRow = (function () {
    function GameRow() {
    }
    return GameRow;
}());
exports.GameRow = GameRow;
var GameStorage = (function (_super) {
    __extends(GameStorage, _super);
    function GameStorage(tableName) {
        _super.call(this, tableName);
    }
    GameStorage.prototype.getAllByLeague = function (leagueId) {
        var sql = 'select g.* from games g inner join rounds r on r.id = g.round_id where r.league_id = $1';
        logger.info(sql);
        return this.db.query(sql, [leagueId]);
    };
    GameStorage.prototype.insert = function (game) {
        game.gameId = this.generateUuid();
        if (!game.when)
            game.when = null;
        var sql = this.squel.insert()
            .into(this.tableName)
            .set(columns.id, game.gameId)
            .set(columns.round_id, game.roundId || null)
            .set(columns.scheduled_at, game.when || null)
            .set(columns.home_score, game.home.score)
            .set(columns.away_score, game.away.score)
            .set(columns.home_team, game.home.team)
            .set(columns.away_team, game.away.team)
            .set(columns.is_final, game.isFinal || false)
            .setFields(this.createdTimestamps())
            .toString();
        logger.info(sql);
        return this.db.none(sql)
            .catch(function (err) {
            logger.error(err);
            return err;
        });
    };
    GameStorage.prototype.update = function (game) {
        var sql = this.squel.update()
            .table(this.tableName)
            .set(columns.round_id, game.roundId || null)
            .set(columns.scheduled_at, game.when || null)
            .set(columns.home_score, game.home.score)
            .set(columns.away_score, game.away.score)
            .set(columns.home_team, game.home.team)
            .set(columns.away_team, game.away.team)
            .set(columns.is_final, game.isFinal || false)
            .setFields(this.udpatedTimestamps())
            .where("id = ?", game.gameId)
            .toString();
        logger.info(sql);
        return this.db.none(sql);
    };
    return GameStorage;
}(storage_1.BaseStorage));
exports.GameStorage = GameStorage;
