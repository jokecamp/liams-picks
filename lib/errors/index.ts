let debug = require('debug')('liams');
var logger = require('winston');

import * as CONFIG from 'config';
import * as exp from "express";

export function unhandledResponse(
    err: any,
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.info('unhandledResponse');
    logger.error(err);

    var msg = {
        message: 'unhandled error',
        error: err || null
    };

    return res.status(500).json(msg);
};

// a non-existant route does not have an err object in signature
export function routeNotFound(
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.warn('route not found');

    var msg = {
        message: 'Route not found.'
    };

    return res.status(404).json(msg);
};
