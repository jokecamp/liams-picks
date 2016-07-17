"use strict";
var CONFIG = require('config');
var logger = require('winston');
var bodyParser = require('body-parser');
var express = require("express");
var errors = require("./errors");
logger.info(CONFIG);
var app = express();
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
    logger.info('hey request');
    res.json('hey');
});
app.use(errors.unhandledResponse);
app.use(errors.routeNotFound);
module.exports = app;
