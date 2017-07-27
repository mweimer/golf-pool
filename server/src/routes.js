/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
  // Insert routes below
  app.use('/api/golfers', require('./api/golfer'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/tournaments', require('./api/tournament'));
  app.use('/api/entries', require('./api/entry'));
  app.use('/api/config', require('./api/config'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
