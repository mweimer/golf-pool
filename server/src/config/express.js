/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import shrinkRay from 'shrink-ray';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import sqldb from '../sqldb';
import expressSequelizeSession from 'express-sequelize-session';
var Store = expressSequelizeSession(session.Store);

export default function (app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(shrinkRay());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new Store(sqldb.sequelize)
  }));

  if (env === 'development') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
