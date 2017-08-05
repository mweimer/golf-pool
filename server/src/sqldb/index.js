/**
 * Sequelize initialization module
 */

'use strict';

const config = require('../config/environment');
const Sequelize = require('sequelize');

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Golfer = db.sequelize.import('../api/golfer/golfer.model');
db.User = db.sequelize.import('../api/user/user.model');
const tournamentModels = db.sequelize.import('../api/tournament/tournament.model');
db.Tournament = tournamentModels.Tournament;
db.TournamentGolfer = tournamentModels.TournamentGolfer;
db.Entry = db.sequelize.import('../api/entry/entry.model');

module.exports = db;
