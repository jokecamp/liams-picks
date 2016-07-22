"use strict";
var debug = require('debug')('liams');
var logger = require('winston');
function unhandledResponse(err, req, res, next) {
    logger.info('unhandledResponse');
    logger.error(err);
    var msg = {
        message: 'unhandled error',
        error: err || null
    };
    return res.status(500).json(msg);
}
exports.unhandledResponse = unhandledResponse;
;
function routeNotFound(req, res, next) {
    logger.warn('route not found');
    var msg = {
        message: 'Route not found.'
    };
    return res.status(404).json(msg);
}
exports.routeNotFound = routeNotFound;
;
