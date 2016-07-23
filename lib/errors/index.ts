let debug = require('debug')('liams');
var logger = require('winston');

import * as CONFIG from 'config';
import * as exp from "express";

export function unhandledResponse(
    err: any,
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.info(JSON.stringify(err));
    logger.info('unhandledResponse');
    logger.error(err);

    var msg = '';

    if (err && err.message) {
        msg = err.message;
    }



    var json = {
        code: 500,
        name: 'unhandled API error',
        message: msg,
        error: {
            message: err.message,
            stack: err.stack
        }
    };

    return res.status(json.code).json(json);
};

// a non-existant route does not have an err object in signature
export function routeNotFound(
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    logger.warn('route not found');

    var json = {
        code: 404,
        name: 'API Route does not exist.',
        message: 'API Route does not exist. Check the url.'
    };

    return res.status(json.code).json(json);
};

export function itemNotFound(
    req: exp.Request,
    res: exp.Response,
    next: exp.NextFunction) {

    var json = {
        code: 404,
        name: 'NotFound',
        message: 'Item not found.'
    };
    return res.status(json.code).json(json);
}
