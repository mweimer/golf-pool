/**
 * Main application routes
 */

'use strict';

const errors = require('./components/errors');
const path = require('path');

module.exports = function (app) {
  // Insert routes below
  app.use('/api/golfers', require('./api/golfer'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/tournaments', require('./api/tournament'));
  app.use('/api/entries', require('./api/entry'));
  app.use('/api/config', require('./api/config'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
