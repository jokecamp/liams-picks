"use strict";
var CONFIG = require('config');
var models_1 = require('../models');
var Root = (function () {
    function Root() {
        this.links = [];
    }
    Root.prototype.addLink = function (rel, paths) {
        var href = CONFIG.domain + paths.join('/');
        var link = new models_1.Link(rel, href);
        this.links.push(link);
    };
    return Root;
}());
exports.Root = Root;
