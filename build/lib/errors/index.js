var CONFIG = require('config');
var logger = require('winston');
var debug = require('debug')('liams');
var unhandledResponse = function (req, res, err) {
    logger.error(err);
    var msg = {
        message: 'unhandled error',
        error: err || null
    };
    return res.json(msg);
};
var routeNotFound = function (req, res, err) {
    logger.warn('route not found');
    var msg = {
        message: 'Route not found'
    };
    return res.json(msg);
};
module.exports = {
    unhandledResponse: unhandledResponse,
    routeNotFound: routeNotFound
};
