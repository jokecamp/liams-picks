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
var storage = new storage_1.LeagueUserStorage('league_users');
var LeagueUser = (function (_super) {
    __extends(LeagueUser, _super);
    function LeagueUser() {
        _super.call(this);
    }
    LeagueUser.prototype.create = function () {
        logger.info('League: create');
        var item = this;
        return storage.insert(item).then(function () {
            return LeagueUser.getById(item.leagueUserId);
        });
    };
    LeagueUser.prototype.update = function () {
        logger.info('League: update');
        var item = this;
        return storage.update(item).then(function () {
            return LeagueUser.getById(item.leagueUserId);
        });
    };
    LeagueUser.parseFromReq = function (req) {
        var leagueUser = new LeagueUser();
        if (req.params && req.params.leagueUserId) {
            leagueUser.leagueUserId = req.params.leagueUserId;
        }
        leagueUser.leagueId = req.body.leagueId;
        leagueUser.userId = req.body.userId;
        leagueUser.isAdmin = req.body.isAdmin;
        return leagueUser;
    };
    LeagueUser.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.leagueUserId = row.id;
        this.leagueId = row.league_id;
        this.userId = row.user_id;
        this.isAdmin = row.is_admin;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [LeagueUser.ROUTE, this.leagueUserId]);
    };
    LeagueUser.fromRow = function (row) {
        if (row === null)
            return null;
        var leagueUser = new LeagueUser();
        leagueUser.populateFromRow(row);
        return leagueUser;
    };
    LeagueUser.fromRows = function (rows) {
        return _.map(rows, LeagueUser.fromRow);
    };
    LeagueUser.getAllByLeague = function (leagueId) {
        logger.info('LeagueUser: getAllByLeague');
        return storage.getAllByLeague(leagueId).then(LeagueUser.fromRows);
    };
    LeagueUser.getAll = function () {
        logger.info('LeagueUser: getAll');
        return storage.getAll().then(LeagueUser.fromRows);
    };
    LeagueUser.getById = function (id) {
        logger.info('LeagueUser: getById', id);
        return storage.getById(id).then(LeagueUser.fromRow);
    };
    LeagueUser.deleteById = function (id) {
        logger.info('LeagueUser: deleteById', id);
        return storage.deleteById(id);
    };
    LeagueUser.ROUTE = 'league-users';
    return LeagueUser;
}(base_1.BaseModel));
exports.LeagueUser = LeagueUser;
