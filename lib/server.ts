var CONFIG = require('config');
var logger = require('winston');
var express = require('express');
var bodyParser = require('body-parser');

import * as exp from "express";

var errors = require('./errors');

logger.info(CONFIG);

var app = express();
app.use(bodyParser.json());

app.get('/',
    function(req: exp.Request, res: exp.Response, next: exp.NextFunction) {
        res.json('hey');
    });

// this handler gets called as long as we use promises .catch(next)
// if not using promises you must call it yourself with try/catch
app.use(errors.unhandledResponse);

// 404s must be last middleware added
app.use(errors.routeNotFound);

module.exports = app;
