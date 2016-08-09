var CONFIG = require('config');
var logger = require('winston');
var debug = require('debug')('liams');

import * as express from "express";
import * as Promise from 'bluebird';
import * as bcrypt from 'bcrypt';

const bcryptAsync: any = Promise.promisifyAll(bcrypt);

export function hashPassword(plainTextPassword: string) {

    var workFactor = CONFIG.bcrypt.factor;
    logger.info('running bcrypt with factor of %s', workFactor);
    debug('running bcrypt with factor of %s', workFactor);
    debug(plainTextPassword);

    return bcryptAsync.genSaltAsync(workFactor)
        .then(function(result: any) {

            // returns hash string
            return bcryptAsync.hashAsync(plainTextPassword, result);
        });
}

// middleware function to hash password before we work with it
export function expectPasswordAndHash(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    if (!req.body.password) {
        return next(new Error('Password is a required field'));
    }

    return hashPassword(req.body.password)
        .then(function(hash: string) {

            // and only pass along the hash
            req.body.password = hash;

            next();

        }).catch(next);
};

export function verify(myPlaintextPassword: string, hash: string) {

    debug('checking password hash against plain text password');
    return bcryptAsync.compareAsync(myPlaintextPassword, hash)
        .then(function(res: any) {
            return res;
        });

};
