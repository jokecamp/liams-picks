'use strict';

var CONFIG = require('config');
var logger = require('winston');

var server = require('./lib/server');

CONFIG.port = CONFIG.port || 1337;

server.listen(CONFIG.port, function () {
  logger.info('Server running on port %d', CONFIG.port);
});
