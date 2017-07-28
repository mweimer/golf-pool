/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import config from '../environment/';
import userSeed from './user';
import golferSeed from './golfer';
import tournamentSeed from './tournament';
import tournamentGolferSeed from './tournamentGolfer';
import entrySeed from './entry';


export default function seedDatabaseIfNeeded () {
    if (config.seedDB) {
        return userSeed()
            .then(() => golferSeed())
            .then(() => tournamentSeed())
            .then(() => tournamentGolferSeed())
            .then(() => entrySeed());
    }
}
