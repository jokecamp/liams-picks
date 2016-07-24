"use strict";
var CONFIG = require('config');
var logger = require('winston');
var bodyParser = require('body-parser');
var express = require("express");
var errors = require('./errors');
logger.info(CONFIG);
var app = express();
app.use(bodyParser.json());
app.use('/', require('./root'));
app.use('/picks', require('./picks'));
app.use('/games', require('./games'));
app.use('/leagues', require('./leagues'));
app.use('/rounds', require('./rounds'));
app.use(errors.unhandledResponse);
app.use(errors.routeNotFound);
module.exports = app;
