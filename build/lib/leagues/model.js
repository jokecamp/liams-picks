"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var models_1 = require('../models');
var storage = require('./storage');
var logger = require('winston');
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
        this.addLink(models_1.Link.REL_SELF, [League.ROUTE, this.leagueId]);
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
        league.name = req.body.name;
        return league;
    };
    League.fromRow = function (row) {
        var league = new League();
        league.populateFromRow(row);
        return league;
    };
    League.getAll = function () {
        logger.info('League: getAll');
        return storage.getAll().then(function (rows) {
            return _.map(rows, function (row) {
                return League.fromRow(row);
            });
        });
    };
    League.getById = function (id) {
        logger.info('League: getById', id);
        return storage.getById(id)
            .then(function (row) {
            return League.fromRow(row);
        });
    };
    League.deleteById = function (id) {
        logger.info('League: deleteById', id);
        return storage.deleteById(id);
    };
    League.ROUTE = 'leagues';
    League.ROUTE_ID = 'leagueId';
    return League;
}(models_1.BaseModel));
exports.League = League;
