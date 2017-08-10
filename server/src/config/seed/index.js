/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

const config = require('../environment/');
const userSeed = require( './user');
const golferSeed = require( './golfer');
const tournamentSeed = require( './tournament');
const tournamentGolferSeed = require( './tournamentGolfer');
const selectionSeed = require( './selection');


module.exports = function seedDatabaseIfNeeded () {
    if (config.seedDB) {
        return userSeed()
            .then(() => golferSeed())
            .then(() => tournamentSeed())
            .then(() => tournamentGolferSeed())
            .then(() => selectionSeed());
    }
}
