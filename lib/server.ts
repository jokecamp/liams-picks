let CONFIG = require('config');
import * as logger from 'winston';
import * as bodyParser from 'body-parser';
import * as express from "express";

// our modules
import * as errors from './errors';

logger.info(CONFIG);

var app = express();
app.use(bodyParser.json());

app.use('/', require('./root'));
app.use('/picks', require('./picks'));
app.use('/leagues', require('./leagues'));

// this handler gets called as long as we use promises .catch(next)
// if not using promises you must call it yourself with try/catch
app.use(errors.unhandledResponse);

// 404s must be last middleware added
app.use(errors.routeNotFound);

module.exports = app;
