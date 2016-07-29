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
var storage = new storage_1.UserStorage('users');
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.call(this);
        this.userId = null;
        this.name = null;
        this.email = null;
    }
    User.prototype.populateFromRow = function (row) {
        if (row === null) {
            throw new Error('row is null');
        }
        this.userId = row.id;
        this.name = row.name;
        this.email = row.email;
        _super.prototype.populateFromRow.call(this, row);
        this.addLink(link_1.Link.REL_SELF, [User.ROUTE, this.userId]);
    };
    User.prototype.create = function () {
        logger.info('User: create');
        var item = this;
        return storage.insert(item).then(function () {
            return User.getById(item.userId);
        });
    };
    User.prototype.update = function () {
        logger.info('User: update');
        var item = this;
        return storage.update(item).then(function () {
            return User.getById(item.userId);
        });
    };
    User.parseFromReq = function (req) {
        var round = new User();
        if (req.params && req.params.userId) {
            round.userId = req.params.userId;
        }
        round.name = req.body.name;
        round.email = req.body.email;
        return round;
    };
    User.fromRow = function (row) {
        if (row === null)
            return null;
        var round = new User();
        round.populateFromRow(row);
        return round;
    };
    User.fromRows = function (rows) {
        return _.map(rows, User.fromRow);
    };
    User.getAll = function () {
        logger.info('User: getAll');
        return storage.getAll().then(User.fromRows);
    };
    User.getById = function (id) {
        logger.info('User: getById', id);
        return storage.getById(id).then(User.fromRow);
    };
    User.deleteById = function (id) {
        logger.info('User: deleteById', id);
        return storage.deleteById(id);
    };
    User.ROUTE = 'users';
    return User;
}(base_1.BaseModel));
exports.User = User;
