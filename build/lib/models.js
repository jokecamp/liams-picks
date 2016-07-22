"use strict";
var DatedRecord = (function () {
    function DatedRecord() {
    }
    DatedRecord.prototype.isDeleted = function () {
        return this.deleted !== null && this.deleted > '';
    };
    DatedRecord.prototype.populateFromRow = function (row) {
        this.created = row.created_at;
        this.modified = row.updated_at;
        this.deleted = row.deleted_at;
    };
    return DatedRecord;
}());
exports.DatedRecord = DatedRecord;
var Pick = (function () {
    function Pick() {
        this.homeScore = null;
        this.awayScore = null;
        this.isBonus = false;
        this.pointsEarned = null;
    }
    return Pick;
}());
exports.Pick = Pick;
var Game = (function () {
    function Game() {
    }
    return Game;
}());
exports.Game = Game;
var Result = (function () {
    function Result() {
    }
    return Result;
}());
exports.Result = Result;
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Round = (function () {
    function Round() {
    }
    return Round;
}());
exports.Round = Round;
