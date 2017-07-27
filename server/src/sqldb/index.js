/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Golfer = db.sequelize.import('../api/golfer/golfer.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Tournament = db.sequelize.import('../api/tournament/tournament.model');
db.Entry = db.sequelize.import('../api/entry/entry.model');

module.exports = db;
