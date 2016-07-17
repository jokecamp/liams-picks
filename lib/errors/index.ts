let debug = require('debug')('liams');

import * as logger from 'winston';
import * as CONFIG from 'config';
import * as exp from "express";

export function unhandledResponse(
    err: any,
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.error(err);

    var msg = {
        message: 'unhandled error',
        error: err || null
    };

    return res.json(msg);
};

export function routeNotFound(
    err: any,
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.warn('route not found');

    var msg = {
        message: 'Route not found'
    };

    return res.json(msg);
};
