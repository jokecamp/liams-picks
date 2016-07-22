"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var models_1 = require('../models');
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
    };
    return League;
}(models_1.DatedRecord));
exports.League = League;
