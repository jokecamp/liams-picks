"use strict";
var debug = require('debug')('liams');
var logger = require('winston');
function unhandledResponse(err, req, res, next) {
    logger.info('unhandledResponse');
    logger.error(err);
    var json = {
        code: 500,
        name: 'unhandled API error',
        message: err || ''
    };
    return res.status(json.code).json(json);
}
exports.unhandledResponse = unhandledResponse;
;
function routeNotFound(req, res, next) {
    logger.warn('route not found');
    var json = {
        code: 404,
        name: 'API Route does not exist.',
        message: 'API Route does not exist. Check the url.'
    };
    return res.status(json.code).json(json);
}
exports.routeNotFound = routeNotFound;
;
function itemNotFound(req, res, next) {
    var json = {
        code: 404,
        name: 'NotFound',
        message: 'Item not found.'
    };
    return res.status(json.code).json(json);
}
exports.itemNotFound = itemNotFound;
