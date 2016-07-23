"use strict";
var Link = (function () {
    function Link(rel, href) {
        this.rel = rel;
        this.href = href;
    }
    Link.REL_SELF = 'self';
    return Link;
}());
exports.Link = Link;
