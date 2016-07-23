"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var logger = require('winston');
var base_1 = require('../common-models/base');
var link_1 = require('../common-models/link');
var storage_1 = require('./storage');
var storage = new storage_1.GameStorage('games');
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.home = {
            team: null,
            score: null
        };
        this.away = {
            team: null,
            score: null
        };
        this.isFinal = false;
    }
    Game.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.gameId = row.id;
        this.when = row.scheduled_at;
        this.home.team = row.home_team,
            this.home.score = row.home_score;
        this.away.team = row.away_team,
            this.away.score = row.away_score;
        this.isFinal = row.is_final || false;
        this.roundId = row.round_id || null;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [Game.ROUTE, this.gameId]);
    };
    Game.prototype.create = function () {
        logger.info('Game: create');
        var item = this;
        return storage.insert(item).then(function () {
            return Game.getById(item.gameId);
        });
    };
    Game.prototype.update = function () {
        logger.info('Game: update');
        var item = this;
        return storage.update(item).then(function () {
            return Game.getById(item.gameId);
        });
    };
    Game.parseFromReq = function (req) {
        var game = new Game();
        game.home.team = req.body.name;
        return game;
    };
    Game.fromRow = function (row) {
        var game = new Game();
        game.populateFromRow(row);
        return game;
    };
    Game.getAll = function () {
        logger.info('Game: getAll');
        return storage.getAll().then(function (rows) {
            return _.map(rows, function (row) {
                return Game.fromRow(row);
            });
        });
    };
    Game.getById = function (id) {
        logger.info('Game: getById', id);
        return storage.getById(id)
            .then(function (row) {
            if (row === null)
                return null;
            return Game.fromRow(row);
        });
    };
    Game.deleteById = function (id) {
        logger.info('Game: deleteById', id);
        return storage.deleteById(id);
    };
    Game.ROUTE = 'games';
    return Game;
}(base_1.BaseModel));
exports.Game = Game;
