"use strict";
var CONFIG = require('config');
var logger = require('winston');
var debug = require('debug')('liams');
function unhandledResponse(req, res, err) {
    logger.error(err);
    var msg = {
        message: 'unhandled error',
        error: err || null
    };
    return res.json(msg);
}
exports.unhandledResponse = unhandledResponse;
;
function routeNotFound(req, res, err) {
    logger.warn('route not found');
    var msg = {
        message: 'Route not found'
    };
    return res.json(msg);
}
exports.routeNotFound = routeNotFound;
;
