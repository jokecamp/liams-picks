"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CONFIG = require('config');
var uuid = require('node-uuid');
var logger = require('winston');
var generic_storage_1 = require('../generic-storage');
var GameStorage = (function (_super) {
    __extends(GameStorage, _super);
    function GameStorage(tableName) {
        _super.call(this, tableName);
    }
    GameStorage.prototype.insert = function (game) {
        game.gameId = uuid.v4();
        var sql = this.squel.insert()
            .into(this.tableName)
            .set("id", game.gameId)
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .set("created_at", this.squel.str('CURRENT_TIMESTAMP'))
            .set("updated_at", this.squel.str('CURRENT_TIMESTAMP'))
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
            .set("home_score", game.home.score)
            .set("away_score", game.away.score)
            .set("home_team", game.home.team)
            .set("away_team", game.away.team)
            .set("is_final", game.isFinal || false)
            .set("created_at", this.squel.str('CURRENT_TIMESTAMP'))
            .set("updated_at", this.squel.str('CURRENT_TIMESTAMP'))
            .toString();
        return this.db.none(sql);
    };
    return GameStorage;
}(generic_storage_1.GenericStorage));
exports.GameStorage = GameStorage;
