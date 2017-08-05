'use strict';
const express = require('express');
const config = require('../config/environment');
const {User} = require('../sqldb');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
