"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('winston');
var base_1 = require('../common-models/base');
var link_1 = require('../common-models/link');
var model_1 = require('../league-users/model');
var storage_1 = require('./storage');
var storage = new storage_1.LeagueStorage('leagues');
var League = (function (_super) {
    __extends(League, _super);
    function League() {
        _super.apply(this, arguments);
    }
    League.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.leagueId = row.id;
        this.name = row.league_name;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [League.ROUTE, this.leagueId]);
    };
    League.prototype.create = function () {
        logger.info('League: create');
        var item = this;
        return storage.insert(item).then(function () {
            return League.getById(item.leagueId);
        });
    };
    League.prototype.update = function () {
        logger.info('League: update');
        var item = this;
        return storage.update(item).then(function () {
            return League.getById(item.leagueId);
        });
    };
    League.parseFromReq = function (req) {
        var league = new League();
        if (req.params && req.params.leagueId) {
            league.leagueId = req.params.leagueId;
        }
        league.name = req.body.name;
        return league;
    };
    League.fromRow = function (row) {
        if (row === null)
            return null;
        var league = new League();
        league.populateFromRow(row);
        return league;
    };
    League.fromRows = function (rows) {
        return _.map(rows, League.fromRow);
    };
    League.getAll = function () {
        logger.info('League: getAll');
        return storage.getAll().then(League.fromRows);
    };
    League.getById = function (id) {
        logger.info('League: getById', id);
        var getById = storage.getById(id).then(League.fromRow);
        var getUsers = model_1.LeagueUser.getAllByLeague(id);
        var joinPromises = function (league, users) {
            league.users = users;
            return league;
        };
        return Promise.join(getById, getUsers, joinPromises);
    };
    League.deleteById = function (id) {
        logger.info('League: deleteById', id);
        return storage.deleteById(id);
    };
    League.ROUTE = 'leagues';
    return League;
}(base_1.BaseModel));
exports.League = League;
