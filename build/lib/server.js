"use strict";
var CONFIG = require('config');
var logger = require('winston');
var bodyParser = require('body-parser');
var express = require("express");
var errors = require('./errors');
var data = require('./data');
logger.info(CONFIG);
var app = express();
app.use(bodyParser.json());
app.use('/picks', require('./picks'));
app.get('/', function (req, res, next) {
    var json = data.getData();
    logger.info('data = ', json);
    res.json(json);
});
app.use(errors.unhandledResponse);
app.use(errors.routeNotFound);
module.exports = app;
