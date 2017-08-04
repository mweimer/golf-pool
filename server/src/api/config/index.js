'use strict';

var express = require('express');
var controller = require('./config.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/current', controller.current);
router.get('/:tournamentId', controller.show);

module.exports = router;
