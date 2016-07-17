"use strict";
var CONFIG = require('config');
var logger = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var errors = require("./errors");
logger.info(CONFIG);
var app = express();
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
    res.json('hey');
});
app.use(errors.unhandledResponse);
app.use(errors.routeNotFound);
module.exports = app;
