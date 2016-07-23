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
