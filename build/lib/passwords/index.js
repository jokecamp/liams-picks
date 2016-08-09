"use strict";
var CONFIG = require('config');
var logger = require('winston');
var debug = require('debug')('liams');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var bcryptAsync = Promise.promisifyAll(bcrypt);
function hashPassword(plainTextPassword) {
    var workFactor = CONFIG.bcrypt.factor;
    logger.info('running bcrypt with factor of %s', workFactor);
    debug('running bcrypt with factor of %s', workFactor);
    debug(plainTextPassword);
    return bcryptAsync.genSaltAsync(workFactor)
        .then(function (result) {
        return bcryptAsync.hashAsync(plainTextPassword, result);
    });
}
exports.hashPassword = hashPassword;
function expectPasswordAndHash(req, res, next) {
    if (!req.body.password) {
        return next(new Error('Password is a required field'));
    }
    return hashPassword(req.body.password)
        .then(function (hash) {
        req.body.password = hash;
        next();
    }).catch(next);
}
exports.expectPasswordAndHash = expectPasswordAndHash;
;
function verify(myPlaintextPassword, hash) {
    debug('checking password hash against plain text password');
    return bcryptAsync.compareAsync(myPlaintextPassword, hash)
        .then(function (res) {
        return res;
    });
}
exports.verify = verify;
;
