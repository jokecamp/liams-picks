"use strict";
var CONFIG = require('config');
var link_1 = require('../common-models/link');
var Root = (function () {
    function Root() {
        this.links = [];
    }
    Root.prototype.addLink = function (rel, paths) {
        var href = CONFIG.domain + paths.join('/');
        var link = new link_1.Link(rel, href);
        this.links.push(link);
    };
    return Root;
}());
exports.Root = Root;
