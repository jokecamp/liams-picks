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
var storage = new storage_1.RoundStorage('rounds');
var Round = (function (_super) {
    __extends(Round, _super);
    function Round() {
        _super.call(this);
        this.roundId = null;
        this.leagueId = null;
        this.number = null;
        this.deadline = null;
    }
    Round.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.roundId = row.id;
        this.leagueId = row.league_id;
        this.number = row.number;
        this.deadline = row.deadline_at;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [Round.ROUTE, this.roundId]);
    };
    Round.prototype.create = function () {
        logger.info('Round: create');
        var item = this;
        return storage.insert(item).then(function () {
            return Round.getById(item.roundId);
        });
    };
    Round.prototype.update = function () {
        logger.info('Round: update');
        var item = this;
        return storage.update(item).then(function () {
            return Round.getById(item.roundId);
        });
    };
    Round.parseFromReq = function (req) {
        var round = new Round();
        if (req.params && req.params.roundId) {
            round.roundId = req.params.roundId;
        }
        round.leagueId = req.body.leagueId;
        round.number = req.body.number;
        round.deadline = req.body.deadline || null;
        return round;
    };
    Round.fromRow = function (row) {
        if (row === null)
            return null;
        var round = new Round();
        round.populateFromRow(row);
        return round;
    };
    Round.fromRows = function (rows) {
        return _.map(rows, Round.fromRow);
    };
    Round.getAllByLeague = function (leagueId) {
        logger.info('Round: getAllByLeague');
        return storage.getAllByLeague(leagueId)
            .then(Round.fromRows);
    };
    Round.getAll = function () {
        logger.info('Round: getAll');
        return storage.getAll().then(Round.fromRows);
    };
    Round.getById = function (id) {
        logger.info('Round: getById', id);
        return storage.getById(id).then(Round.fromRow);
    };
    Round.deleteById = function (id) {
        logger.info('Round: deleteById', id);
        return storage.deleteById(id);
    };
    Round.ROUTE = 'rounds';
    return Round;
}(base_1.BaseModel));
exports.Round = Round;
