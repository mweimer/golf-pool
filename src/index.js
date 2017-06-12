'use strict';

require("./style.css");

import app from './app.js';

import dataService from './data.service.js';
import settingsService from './settings.service.js';

app.service('dataService', dataService);
app.service('settingsService', settingsService);


import golferLeaderboard from './golfer-leaderboard.component.js';
import poolLeaderboard from './pool-leaderboard.component.js';
import settings from './settings.component.js';

app.component('golferLeaderboard', golferLeaderboard);
app.component('poolLeaderboard', poolLeaderboard);
app.component('settings', settings);








