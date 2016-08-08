let CONFIG = require('config');
import * as logger from 'winston';

let cors = require('cors');
import * as bodyParser from 'body-parser';
import * as express from "express";

// our modules
import * as errors from './errors';

logger.info(CONFIG);

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./root'));
app.use('/users', require('./users'));
app.use('/picks', require('./picks'));
app.use('/games', require('./games'));
app.use('/leagues', require('./leagues'));
app.use('/rounds', require('./rounds'));

app.use('/league-users', require('./league-users'));

// this handler gets called as long as we use promises .catch(next)
// if not using promises you must call it yourself with try/catch
app.use(errors.unhandledResponse);

// 404s must be last middleware added
app.use(errors.routeNotFound);

module.exports = app;
