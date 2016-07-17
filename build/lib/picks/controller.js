"use strict";
var CONFIG = require('config');
var data = require('../data');
function getPicks(req, res, next) {
    var picks = data.getData();
    return res.json(picks);
}
exports.getPicks = getPicks;
;
