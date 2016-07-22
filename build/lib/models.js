"use strict";
var CONFIG = require('config');
var BaseModel = (function () {
    function BaseModel() {
    }
    BaseModel.prototype.isDeleted = function () {
        return this.deleted !== null && this.deleted > '';
    };
    BaseModel.prototype.populateFromRow = function (row) {
        this.created = row.created_at;
        this.modified = row.updated_at;
        this.deleted = row.deleted_at;
        this.links = [];
    };
    BaseModel.prototype.addLink = function (rel, paths) {
        var href = CONFIG.domain + paths.join('/');
        var link = new Link(rel, href);
        this.links.push(link);
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
var Link = (function () {
    function Link(rel, href) {
        this.rel = rel;
        this.href = href;
    }
    Link.REL_SELF = 'self';
    return Link;
}());
exports.Link = Link;
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
