/**
 * Main application file
 */

'use strict';

const express = require('express');
const sqldb = require('./sqldb');
const config = require('./config/environment');
const http = require('http');
const seedDatabaseIfNeeded = require('./config/seed');
//const config == require('./config/test');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer () {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(seedDatabaseIfNeeded)
  .then(startServer)
  .catch(function (err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
