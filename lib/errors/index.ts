var CONFIG = require('config');
var logger = require('winston');
var debug = require('debug')('liams');

import * as exp from "express";

export function unhandledResponse(
    req: exp.Request,
    res: exp.Response,
    err: exp.ErrorRequestHandler) {

    logger.error(err);

    var msg = {
        message: 'unhandled error',
        error: err || null
    };

    return res.json(msg);
};

export function routeNotFound(
    req: exp.Request,
    res: exp.Response,
    err: exp.ErrorRequestHandler) {

    logger.warn('route not found');

    var msg = {
        message: 'Route not found'
    };

    return res.json(msg);
};
