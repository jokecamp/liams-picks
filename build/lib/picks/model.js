"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var logger = require('winston');
var link_1 = require('../common-models/link');
var base_1 = require('../common-models/base');
var storage_1 = require('./storage');
var storage = new storage_1.PicksStorage('picks');
var model_1 = require('../users/model');
var Pick = (function (_super) {
    __extends(Pick, _super);
    function Pick() {
        _super.call(this);
        this.pickId = null;
        this.home = {
            score: null
        };
        this.away = {
            score: null
        };
        this.isBonus = false;
        this.pointsEarned = null;
        this.user = new model_1.User();
    }
    Pick.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.pickId = row.id;
        this.gameId = row.game_id;
        this.home.score = row.home_score;
        this.away.score = row.away_score;
        this.isBonus = row.is_bonus;
        this.user = new model_1.User();
        this.user.userId = row.user_id;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [Pick.ROUTE, this.pickId]);
    };
    Pick.prototype.getUserByPick = function () {
        var item = this;
        if (item.user.userId > '') {
            return model_1.User.getById(item.user.userId)
                .then(function (user) {
                if (user === null)
                    throw new Error('invalid user id');
                item.user = user;
            });
        }
        return model_1.User.getByToken(item.user.token)
            .then(function (user) {
            if (user === null)
                throw new Error('invalid user token');
            item.user = user;
        });
    };
    Pick.prototype.create = function () {
        logger.info('Pick: create');
        var item = this;
        return item.getUserByPick()
            .then(function () {
            return storage.insert(item);
        }).then(function () {
            return Pick.getById(item.pickId);
        });
    };
    Pick.prototype.update = function () {
        logger.info('Pick: update');
        var item = this;
        return storage.update(item).then(function () {
            return Pick.getById(item.pickId);
        });
    };
    Pick.parseFromReq = function (req) {
        var pick = new Pick();
        if (req.params && req.params.pickId) {
            pick.pickId = req.params.pickId;
        }
        pick.gameId = req.body.gameId;
        pick.home.score = req.body.home.score;
        pick.away.score = req.body.away.score;
        pick.isBonus = req.body.isBonus;
        pick.pointsEarned = req.body.pointsEarned;
        if (req.body.user) {
            pick.user.userId = req.body.user.userId || null;
            pick.user.token = req.body.user.token || null;
        }
        return pick;
    };
    Pick.fromRow = function (row) {
        if (row === null)
            return null;
        var pick = new Pick();
        pick.populateFromRow(row);
        return pick;
    };
    Pick.fromRows = function (rows) {
        return _.map(rows, Pick.fromRow);
    };
    Pick.getAll = function () {
        logger.info('Pick: getAll');
        return storage.getAll().then(Pick.fromRows);
    };
    Pick.getById = function (id) {
        logger.info('Pick: getById', id);
        return storage.getById(id).then(Pick.fromRow);
    };
    Pick.deleteById = function (id) {
        logger.info('Pick: deleteById', id);
        return storage.deleteById(id);
    };
    Pick.ROUTE = 'picks';
    return Pick;
}(base_1.BaseModel));
exports.Pick = Pick;
