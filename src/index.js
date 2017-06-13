'use strict';

import './style.css';

import app from './app.js';


import dataService from './data.service.js';
import gotoService from './goto.service.js';
import settingsService from './settings.service.js';

app.service('dataService', dataService);
app.service('gotoService', gotoService);
app.service('settingsService', settingsService);


import golfers from './golfers.component.js';
import footer from './footer.component.js';
import header from './header.component.js';
import pool from './pool.component.js';
import settings from './settings.component.js';

app.component('golfers', golfers);
app.component('gpFooter', footer);
app.component('gpHeader', header);
app.component('pool', pool);
app.component('settings', settings);








