'use strict';

var express = require('express');
var controller = require('./config.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:tournamentId', auth.isAuthenticated(), controller.show);

module.exports = router;
