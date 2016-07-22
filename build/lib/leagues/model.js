"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var models_1 = require('../models');
var storage = require('./storage');
var League = (function (_super) {
    __extends(League, _super);
    function League() {
        _super.apply(this, arguments);
    }
    League.prototype.parseFromReq = function (req) {
        this.name = req.body.name;
    };
    League.prototype.populateFromRow = function (row) {
        this.leagueId = row.id;
        this.name = row.namee;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(models_1.Link.REL_SELF, [League.ROUTE, this.leagueId]);
    };
    League.prototype.create = function () {
        return storage.insert(this);
    };
    League.fromRow = function (row) {
        var league = new League();
        league.populateFromRow(row);
        return league;
    };
    League.getAll = function () {
        return storage.getAll().then(function (rows) {
            return _.map(rows, function (row) {
                return League.fromRow(row);
            });
        });
    };
    League.getById = function (id) {
        return storage.getById(id)
            .then(function (row) {
            return League.fromRow(row);
        });
    };
    League.ROUTE = 'leagues';
    return League;
}(models_1.BaseModel));
exports.League = League;
