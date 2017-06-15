webpackJsonp([0],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(134);

var _favicon = __webpack_require__(137);

var _favicon2 = _interopRequireDefault(_favicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config.contestantData.forEach(function (c, i) {
	c.id = i;
});

var app = angular.module('golfPool', ['ngSanitize', 'ngRoute', 'angular-google-analytics']).constant('GOLFERS', _config.golferData).constant('CONTESTANTS', _config.contestantData).constant('REFRESH_TIME', 60000).constant('LEADERBOARD_URL', _config.leaderboardUrl).constant('TOURNEY_TITLE', _config.tourneyTitle).constant('MOVEMENT', {
	positive: 'positive',
	negative: 'negative',
	none: 'none'
}).config(function ($routeProvider, AnalyticsProvider) {
	$routeProvider.when('/', {
		template: '<pool></pool>'
	}).when('/golfers', {
		template: '<golfers></golfers>'
	}).when('/settings', {
		template: '<settings></settings>'
	});

	AnalyticsProvider.setAccount('UA-8634967-4');
}).run(function ($rootScope, TOURNEY_TITLE, Analytics) {
	$rootScope.getTitle = function () {
		return $rootScope.positions ? $rootScope.positions + ' - ' + TOURNEY_TITLE + ' Player Pool' : TOURNEY_TITLE + ' Player Pool';
	};
	$rootScope.faviconUrl = _favicon2.default;
});

exports.default = app;

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var service = function service($http, GOLFERS, CONTESTANTS, MOVEMENT, LEADERBOARD_URL, settingsService, notificationService, $rootScope) {

	var entries = CONTESTANTS.map(function (c) {
		return c.entries.map(function (e, i) {
			return { name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id };
		});
	}).reduce(function (prev, curr) {
		return prev.concat(curr);
	});

	var previousEntries = null;

	this.get = function () {
		return getGolferScores().then(function (golferScores) {
			var newEntries = createEntriesWithScores(golferScores);
			notificationService.update(previousEntries, newEntries);
			updateTitle(newEntries);
			previousEntries = newEntries;
			return { entries: newEntries, golfers: golferScores };
		});
	};

	var updateTitle = function updateTitle(entries) {
		var selectedContestantId = settingsService.getSelectedContestantId();
		if (selectedContestantId >= 0) {
			var positions = entries.filter(function (e) {
				return e.contestantId === selectedContestantId && !e.isDQ;
			}).map(function (e) {
				return e.position;
			}).reduce(function (c, n) {
				return c !== null ? c + ', ' + n : n;
			}, null);

			$rootScope.positions = positions;
		} else {
			$rootScope.positions = null;
		}
	};

	var getGolferScores = function getGolferScores() {
		return $http({
			method: 'GET',
			url: LEADERBOARD_URL
		}).then(function (response) {
			var scorePage = $(response.data);
			var golferRows = scorePage.find('.leaderboard-table .player-overview');
			var scores = [];

			golferRows.each(function (index) {
				scores.push(extract($(this), index));
			});

			var golfersWithScores = GOLFERS.map(function (golfer) {
				var firstName = golfer.firstName.toLowerCase();
				var lastName = golfer.lastName.toLowerCase();
				var score = scores.find(function (score) {
					var fullName = score.fullName.toLowerCase();
					return fullName.includes(firstName) && fullName.includes(lastName);
				});

				var golferCopy = angular.copy(golfer);
				if (score) {
					golferCopy.score = score;
				} else {
					golferCopy.score = emptyScore(golfer);
				}

				var selectedContestantId = settingsService.getSelectedContestantId();
				golferCopy.entryCount = entries.filter(function (e) {
					return e.golferIds.includes(golferCopy.id);
				}).length;;
				golferCopy.isSelected = entries.some(function (e) {
					return e.golferIds.includes(golferCopy.id) && e.contestantId === selectedContestantId;
				});

				return golferCopy;
			});

			return golfersWithScores;
		});
	};

	var emptyScore = function emptyScore(golfer) {
		return {
			index: Number.MAX_SAFE_INTEGER,
			isDNF: true,
			toPar: '--',
			relativeScore: Number.MAX_SAFE_INTEGER,
			total: '--',
			totalScore: Number.MAX_SAFE_INTEGER,
			position: '--',
			currentRoundScore: '--',
			thru: '--',
			round1Score: '--',
			round2Score: '--',
			round3Score: '--',
			round4Score: '--',
			fullName: '',
			shortName: golfer.firstName[0] + '. ' + golfer.lastName,
			logoImage: '',
			startTime: null,
			movement: { text: '-', direction: MOVEMENT.none }
		};
	};

	var extract = function extract(row, index) {
		var isDNF = false;

		var toPar = row.find('.relativeScore').text();
		var relativeScore = toPar === 'E' ? 0 : parseInt(toPar);
		if (isNaN(relativeScore)) {
			relativeScore = Number.MAX_SAFE_INTEGER;
			isDNF = true;
		}

		var total = row.find('.totalScore').text();
		var totalScore = total === '--' ? 0 : parseInt(total);
		if (isNaN(totalScore)) {
			totalScore = Number.MAX_SAFE_INTEGER;
		}

		var thru = row.find('.thru').text();
		var startTime = void 0;
		if (thru === '') {
			var time = row.find('.thru .date-container').attr('data-date');
			startTime = new Date(time);
		} else {
			startTime = null;
		}

		var position = row.find('.position').text();
		var currentRoundScore = row.find('.currentRoundScore').text();

		var round1Score = row.find('.round1').text();
		var round2Score = row.find('.round2').text();
		var round3Score = row.find('.round3').text();
		var round4Score = row.find('.round4').text();
		var fullName = row.find('.full-name').text();
		var shortName = row.find('.short-name').text();
		var logoImage = row.find('.team-logo img').attr('src');

		var movementElement = row.find('.movement');
		var movementText = movementElement.text();
		var movementDirection = void 0;
		if (movementElement.hasClass('positive')) {
			movementDirection = MOVEMENT.positive;
		} else if (movementElement.hasClass('negative')) {
			movementDirection = MOVEMENT.negative;
		} else {
			movementDirection = MOVEMENT.none;
		}

		return {
			index: index,
			isDNF: isDNF,
			toPar: toPar,
			relativeScore: relativeScore,
			total: total,
			totalScore: totalScore,
			position: position,
			currentRoundScore: currentRoundScore,
			thru: thru,
			round1Score: round1Score,
			round2Score: round2Score,
			round3Score: round3Score,
			round4Score: round4Score,
			fullName: fullName,
			shortName: shortName,
			logoImage: logoImage,
			startTime: startTime,
			movement: {
				text: movementText,
				direction: movementDirection
			}
		};
	};

	var createEntriesWithScores = function createEntriesWithScores(golferScores) {
		var entriesWithScores = entries.map(function (entry) {
			var entryGolfers = entry.golferIds.map(function (gid) {
				return angular.copy(golferScores.find(function (golfer) {
					return golfer.id === gid;
				}));
			});
			var overallRelativeScore = void 0,
			    overallTotalScore = void 0,
			    overallToPar = void 0;
			var isDQ = entryGolfers.filter(function (golfer) {
				return golfer.score.isDNF;
			}).length > 1;
			var selectedContestantId = settingsService.getSelectedContestantId();
			var isSelected = entry.contestantId === selectedContestantId;

			if (!isDQ) {
				var worstGolfers = _.orderBy(entryGolfers, ['score.relativeScore', 'score.totalScore', 'id'], ['desc', 'desc', 'desc']);
				worstGolfers[0].throwaway = true;

				overallRelativeScore = entryGolfers.filter(function (golfer) {
					return golfer.throwaway !== true;
				}).reduce(function (prev, curr) {
					return prev + curr.score.relativeScore;
				}, 0);

				overallTotalScore = entryGolfers.filter(function (golfer) {
					return golfer.throwaway !== true;
				}).reduce(function (prev, curr) {
					return prev + curr.score.totalScore;
				}, 0).toString();

				overallToPar = overallRelativeScore === 0 ? 'E' : overallRelativeScore.toString();
			} else {
				overallRelativeScore = Number.MAX_SAFE_INTEGER;
				overallTotalScore = '--';
				overallToPar = '--';
			}

			return {
				name: entry.name,
				golfers: entryGolfers,
				overallRelativeScore: overallRelativeScore,
				overallTotalScore: overallTotalScore,
				overallToPar: overallToPar,
				isDQ: isDQ,
				isSelected: isSelected,
				contestantId: entry.contestantId
			};
		});

		return addPositions(entriesWithScores);
	};

	var addPositions = function addPositions(entriesWithScores) {
		var sortedEntries = _.sortBy(entriesWithScores, ['overallRelativeScore', 'overallTotalScore']);

		var position = 1;
		var lastScore = 0;
		sortedEntries.forEach(function (entry, index) {
			var isTied = sortedEntries.filter(function (e) {
				return e.overallRelativeScore === entry.overallRelativeScore;
			}).length > 1;
			if (entry.overallRelativeScore > lastScore) {
				position = index + 1;
			}
			entry.position = isTied ? 'T' + position : position.toString();
			entry.positionNumber = position;
			lastScore = entry.overallRelativeScore;
		});

		return sortedEntries;
	};
};

exports.default = service;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = '\n<footer>\n  <span ng-bind="::$ctrl.refreshTime">\n</footer>';

var controller = function controller(REFRESH_TIME) {
    var _this = this;

    this.$onInit = function () {
        _this.refreshTime = 'Refresh Time: ' + REFRESH_TIME / 1000 + ' seconds';
    };
};

exports.default = { template: template, controller: controller };

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var template = '\n<div class="golfer-leaderboard">\n<table class="table table-striped table-responsive table-condensed">\n\t<thead>\n\t<tr>\n\t\t<th>Pos</th><th class="movement"></th><th>Player</th><th>Entries</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>\n\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr ng-repeat="golfer in $ctrl.golfers track by $index" ng-attr-id="golfer-{{golfer.id}}" ng-class="{\'success\': golfer.isHighlighted, \'selected\': golfer.isSelected}">\n\t\t\t<td ng-bind="golfer.score.position"></td>\n\t\t\t<td ng-class="golfer.score.movement.direction" ng-bind="golfer.score.movement.text"></td>\n\t\t\t<td><div ng-if="golfer.score.logoImage" class="logo"><img ng-src="{{golfer.score.logoImage}}" /></div><span ng-bind="$ctrl.getName(golfer)"></span></td>\n\t\t\t<td ng-bind="golfer.entryCount"></td>\n\t\t\t<td ng-bind="golfer.score.toPar"></td>\n\t\t\t<td ng-bind="golfer.score.currentRoundScore"></td>\n\t\t\t<td ng-if="golfer.score.thru" ng-bind="golfer.score.thru"></td>\n\t\t\t<td ng-if="!golfer.score.thru" ng-bind="golfer.score.startTime | date:\'shortTime\'"></td>\n\t\t\t<td ng-bind="golfer.score.round1Score"></td>\n\t\t\t<td ng-bind="golfer.score.round2Score"></td>\n\t\t\t<td ng-bind="golfer.score.round3Score"></td>\n\t\t\t<td ng-bind="golfer.score.round4Score"></td>\n\t\t\t<td ng-bind="golfer.score.total"></td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>';

var controller = function controller(dataService, $interval, REFRESH_TIME, $anchorScroll, $timeout, gotoService) {
	var _this = this;

	var refreshData = function refreshData() {
		return dataService.get().then(function (data) {
			_this.golfers = _.sortBy(data.golfers, function (g) {
				return g.score.index;
			});
		});
	};

	var scrollHighlightGolfer = function scrollHighlightGolfer() {
		var golferId = gotoService.getGotoGolferId();
		if (golferId) {
			$timeout(function () {
				return $anchorScroll('golfer-' + golferId);
			}, 10);
			var golfer = _this.golfers.find(function (g) {
				return g.id === golferId;
			});
			if (golfer) {
				golfer.isHighlighted = true;
				$timeout(function () {
					return golfer.isHighlighted = false;
				}, 3000);
			}
		}
	};

	var stop = void 0;
	this.$onInit = function () {
		refreshData().then(function () {
			return scrollHighlightGolfer();
		});
		stop = $interval(function () {
			return refreshData();
		}, REFRESH_TIME);
	};

	this.$onDestroy = function () {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	};

	this.getName = function (golfer) {
		return golfer.firstName + ' ' + golfer.lastName + (golfer.isAmateur ? ' (A)' : '');
	};
};

exports.default = { template: template, controller: controller };

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var service = function service($location) {
    var gotoGolferId = null;

    this.gotoGolfer = function (id) {
        gotoGolferId = id;
        $location.url('/golfers');
    };

    this.getGotoGolferId = function () {
        var id = gotoGolferId;
        gotoGolferId = null;
        return id;
    };
};

exports.default = service;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logo = __webpack_require__(88);

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '\n<nav class="navbar navbar-default">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">\n         <img alt="Golf Pool" ng-src="{{::$ctrl.logoUrl}}">\n      </a>\n    </div>\n\n    <div class="collapse navbar-collapse" id="navbar-collapse">\n      <ul class="nav navbar-nav">\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'pool\'}"><a href="/">Pool</a></li>\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'golfers\'}"><a href="#!/golfers">Golfers</a></li>\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'settings\'}"><a href="#!/settings">Settings</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>';

var controller = function controller($location) {
  var _this = this;

  this.currentRoute = function () {
    if ($location.path() === '/') {
      return 'pool';
    } else if ($location.path() === '/golfers') {
      return 'golfers';
    } else if ($location.path() === '/settings') {
      return 'settings';
    }

    return '';
  };

  this.$onInit = function () {
    _this.logoUrl = _logo2.default;
  };
};

exports.default = { template: template, controller: controller };

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _logo = __webpack_require__(88);

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = function service(settingsService, $rootScope) {

	var status = {
		supported: Boolean('Notification' in window),
		granted: false
	};

	if (status.supported) {
		Notification.requestPermission().then(function (result) {
			$rootScope.$applyAsync(function () {
				return status.granted = result === 'granted';
			});
		});
	}

	this.getStatus = function () {
		return status;
	};

	this.update = function (previousEntries, currentEntries) {
		var selectedContestantId = settingsService.getSelectedContestantId();
		if (!status.supported || selectedContestantId < 0 || !previousEntries) {
			return;
		}

		var previousPositions = previousEntries.filter(function (e) {
			return e.contestantId === selectedContestantId;
		}).map(function (e) {
			return e.positionNumber;
		});
		var currentPositions = currentEntries.filter(function (e) {
			return e.contestantId === selectedContestantId;
		}).map(function (e) {
			return e.positionNumber;
		});

		if (previousPositions.some(function (p) {
			return p === 1 || p === 2;
		}) && !currentPositions.some(function (p) {
			return p === 1 || p === 2;
		})) {
			showNotification(false);
		} else if (!previousPositions.some(function (p) {
			return p === 1 || p === 2;
		}) && currentPositions.some(function (p) {
			return p === 1 || p === 2;
		})) {
			showNotification(true);
		}
	};

	var showNotification = function showNotification(inTopTwo) {
		Notification.requestPermission().then(function (result) {
			if (result === 'granted') {
				status.granted = true;
				var title = inTopTwo ? 'You\'ve moved into the top 2!' : 'You\'ve dropped out of the top 2.';
				var options = {
					icon: _logo2.default
				};
				var notification = new Notification(title, options);
			} else {
				status.granted = false;
			}
		});
	};
};

exports.default = service;

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var template = '\n<div class="pool-leaderboard">\n<table class="table table-responsive table-condensed">\n\t<thead><tr>\n\t\t<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>To Par</th>\n\t</tr></thead>\n\t<tbody>\n\t\t<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ, selected: entry.isSelected}">\n\t\t\t<td ng-bind="entry.position"></td>\n\t\t\t<td ng-bind="entry.name"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[0])" ng-class="entry.golfers[0].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[1])" ng-class="entry.golfers[1].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[2])" ng-class="entry.golfers[2].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[3])" ng-class="entry.golfers[3].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>\n\t\t\t<th ng-bind="entry.overallToPar"></th>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>';

var controller = function controller(dataService, $interval, REFRESH_TIME, $filter, gotoService) {
	var _this = this;

	var dateFilter = $filter('date');

	var refreshData = function refreshData() {
		dataService.get().then(function (data) {
			_this.entries = data.entries;
		});
	};

	var stop = void 0;
	this.$onInit = function () {
		refreshData();
		stop = $interval(function () {
			return refreshData();
		}, REFRESH_TIME);
	};

	this.$onDestroy = function () {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	};

	this.getGolferInfo = function (entry, index) {
		var golfer = entry.golfers[index];
		var info = '' + golfer.score.shortName + (golfer.isAmateur ? ' (A)' : '') + ': ' + golfer.score.toPar + ' (' + (golfer.score.thru ? golfer.score.thru : dateFilter(golfer.score.startTime, 'shortTime')) + ')';
		return info;
	};

	this.gotoGolfer = function (golfer) {
		gotoService.gotoGolfer(golfer.id);
	};
};

exports.default = { template: template, controller: controller };

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = '\n<form class="settings">\n  <div class="form-group">\n    <label for="contestantDropdown">Selected Contestant: </label>\n    <select id="contestantDropdown" class="form-control" ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">\n\t\t<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>\n\t</select>\n  </div>\n  <div class="checkbox">\n    <label>\n      <input disabled type="checkbox" ng-checked="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted"> Notifications Enabled\n      <span ng-if="$ctrl.notificationStatus.supported && !$ctrl.notificationStatus.granted">(To turn on notifications, go into your browser settings and enable them for this domain)</span>\n      <span ng-if="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted">(To turn off notifications, go into your browser settings and disable them for this domain)</span>\n      <span ng-if="!$ctrl.notificationStatus.supported">(You browser does not support notifications)</span>\n    </label>\n  </div>\n</form>';

var controller = function controller(CONTESTANTS, settingsService, notificationService) {
  var _this = this;

  this.contestantSelected = function () {
    settingsService.setSelectedContestantId(_this.selectedContestantId);
  };

  this.$onInit = function () {
    _this.contestants = _.concat([{ name: 'none', id: -1 }], CONTESTANTS.map(function (c) {
      return { name: c.name, id: c.id };
    }));
    _this.selectedContestantId = settingsService.getSelectedContestantId().toString();
    _this.notificationStatus = notificationService.getStatus();
  };
};

exports.default = { template: template, controller: controller };

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var service = function service(TOURNEY_TITLE) {
	var hasLocalStorage = typeof Storage !== 'undefined';
	var selectedContestantKey = TOURNEY_TITLE + '-selectedContestantId';
	var enableNotifactionsKey = 'enableNotifactions';

	this.getSelectedContestantId = function () {
		if (!hasLocalStorage || !localStorage.getItem(selectedContestantKey)) {
			return -1;
		}

		return parseInt(localStorage.getItem(selectedContestantKey));
	};

	this.setSelectedContestantId = function (value) {
		localStorage.setItem(selectedContestantKey, value);
	};

	this.getEnableNotifications = function () {
		if (!hasLocalStorage || !localStorage.getItem(enableNotifactionsKey)) {
			return true;
		}

		return localStorage.getItem(enableNotifactionsKey) === "true";
	};

	this.setEnableNotifications = function (value) {
		localStorage.setItem(enableNotifactionsKey, value);
	};
};

exports.default = service;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(136);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(138)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var tourneyTitle = '2017 US Open';

var leaderboardUrl = 'http://www.espn.com/golf/leaderboard?tournamentId=3066';

var golferData = [{ id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' }, { id: 2, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' }, { id: 3, firstName: 'Rory', lastName: 'McIlroy', tier: 'A' }, { id: 4, firstName: 'Jason', lastName: 'Day', tier: 'A' }, { id: 5, firstName: 'Jon', lastName: 'Rahm', tier: 'A' }, { id: 6, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' }, { id: 7, firstName: 'Justin', lastName: 'Rose', tier: 'A' }, { id: 8, firstName: 'Sergio', lastName: 'Garcia', tier: 'A' }, { id: 9, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' }, { id: 10, firstName: 'Henrik', lastName: 'Stenson', tier: 'A' }, { id: 11, firstName: 'Adam', lastName: 'Scott', tier: 'B' }, { id: 12, firstName: 'Justin', lastName: 'Thomas', tier: 'B' }, { id: 13, firstName: 'Brooks', lastName: 'Koepka', tier: 'B' }, { id: 14, firstName: 'Branden', lastName: 'Grace', tier: 'B' }, { id: 15, firstName: 'Thomas', lastName: 'Pieters', tier: 'B' }, { id: 16, firstName: 'Paul', lastName: 'Casey', tier: 'B' }, { id: 17, firstName: 'Alex', lastName: 'Noren', tier: 'B' }, { id: 18, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' }, { id: 19, firstName: 'Louis', lastName: 'Oosthuizen', tier: 'B' }, { id: 20, firstName: 'Jason', lastName: 'Dufner', tier: 'B' }, { id: 21, firstName: 'Matt', lastName: 'Kuchar', tier: 'B' }, { id: 22, firstName: 'Bubba', lastName: 'Watson', tier: 'B' }, { id: 23, firstName: 'Daniel', lastName: 'Berger', tier: 'B' }, { id: 24, firstName: 'Kevin', lastName: 'Chappell', tier: 'B' }, { id: 25, firstName: 'Kevin', lastName: 'Kisner', tier: 'B' }, { id: 26, firstName: 'Martin', lastName: 'Kaymer', tier: 'B' }, { id: 27, firstName: 'Shane', lastName: 'Lowry', tier: 'B' }, { id: 28, firstName: 'Patrick', lastName: 'Reed', tier: 'B' }, { id: 29, firstName: 'Billy', lastName: 'Horschel', tier: 'B' }, { id: 30, firstName: 'Francesco', lastName: 'Molinari', tier: 'B' }, { id: 31, firstName: 'Marc', lastName: 'Leishman', tier: 'B' }, { id: 32, firstName: 'Lee', lastName: 'Westwood', tier: 'C' }, { id: 33, firstName: 'Brandt', lastName: 'Snedeker', tier: 'C' }, { id: 34, firstName: 'Bud', lastName: 'Cauley', tier: 'C' }, { id: 35, firstName: 'Byeong Hun', lastName: 'An', tier: 'C' }, { id: 36, firstName: 'Jimmy', lastName: 'Walker', tier: 'C' }, { id: 37, firstName: 'Matthew', lastName: 'Fitzpatrick', tier: 'C' }, { id: 38, firstName: 'Rafael Cabrera', lastName: 'Bello', tier: 'C' }, { id: 39, firstName: 'Russell', lastName: 'Henley', tier: 'C' }, { id: 40, firstName: 'Tyrrell', lastName: 'Hatton', tier: 'C' }, { id: 41, firstName: 'Adam', lastName: 'Hadwin', tier: 'C' }, { id: 42, firstName: 'Bernd', lastName: 'Wiesberger', tier: 'C' }, { id: 43, firstName: 'Brendan', lastName: 'Steele', tier: 'C' }, { id: 44, firstName: 'Emiliano', lastName: 'Grillo', tier: 'C' }, { id: 45, firstName: 'Gary', lastName: 'Woodland', tier: 'C' }, { id: 46, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' }, { id: 47, firstName: 'Si Woo', lastName: 'Kim', tier: 'C' }, { id: 48, firstName: 'Steve', lastName: 'Stricker', tier: 'C' }, { id: 49, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'C' }, { id: 50, firstName: 'Bill', lastName: 'Haas', tier: 'C' }, { id: 51, firstName: 'Brian', lastName: 'Harman', tier: 'C' }, { id: 52, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' }, { id: 53, firstName: 'Graeme', lastName: 'McDowell', tier: 'C' }, { id: 54, firstName: 'Lucas', lastName: 'Glover', tier: 'C' }, { id: 55, firstName: 'Ross', lastName: 'Fisher', tier: 'C' }, { id: 56, firstName: 'Russell', lastName: 'Knox', tier: 'C' }, { id: 57, firstName: 'Stewart', lastName: 'Cink', tier: 'C' }, { id: 58, firstName: 'Webb', lastName: 'Simpson', tier: 'C' }, { id: 59, firstName: 'Zach', lastName: 'Johnson', tier: 'C' }, { id: 60, firstName: 'Pat', lastName: 'Perez', tier: 'D' }, { id: 61, firstName: 'Alexander', lastName: 'Levy', tier: 'D' }, { id: 62, firstName: 'Daniel', lastName: 'Summerhays', tier: 'D' }, { id: 63, firstName: 'Danny', lastName: 'Willett', tier: 'D' }, { id: 64, firstName: 'David', lastName: 'Lingmerth', tier: 'D' }, { id: 65, firstName: 'Hao-tong', lastName: 'Li', tier: 'D' }, { id: 66, firstName: 'Hideto', lastName: 'Tanihara', tier: 'D' }, { id: 67, firstName: 'Jhonattan', lastName: 'Vegas', tier: 'D' }, { id: 68, firstName: 'Keegan', lastName: 'Bradley', tier: 'D' }, { id: 69, firstName: 'Kevin', lastName: 'Na', tier: 'D' }, { id: 70, firstName: 'Martin', lastName: 'Laird', tier: 'D' }, { id: 71, firstName: 'Peter', lastName: 'Uihlein', tier: 'D' }, { id: 72, firstName: 'Scott', lastName: 'Piercy', tier: 'D' }, { id: 73, firstName: 'Sean', lastName: 'O\'Hair', tier: 'D' }, { id: 74, firstName: 'Wesley', lastName: 'Bryan', tier: 'D' }, { id: 75, firstName: 'William', lastName: 'McGirt', tier: 'D' }, { id: 76, firstName: 'Andrew', lastName: 'Johnston', tier: 'D' }, { id: 77, firstName: 'Jamie', lastName: 'Donaldson', tier: 'D' }, { id: 78, firstName: 'Bryson', lastName: 'DeChambeau', tier: 'D' }, { id: 79, firstName: 'Cheng Tsung', lastName: 'Pan', tier: 'D' }, { id: 80, firstName: 'George', lastName: 'Coetzee', tier: 'D' }, { id: 81, firstName: 'Harris', lastName: 'English', tier: 'D' }, { id: 82, firstName: 'Jamie', lastName: 'Lovemark', tier: 'D' }, { id: 83, firstName: 'Jason', lastName: 'Kokrak', tier: 'D' }, { id: 84, firstName: 'Jeunghun', lastName: 'Wang', tier: 'D' }, { id: 85, firstName: 'Jim', lastName: 'Furyk', tier: 'D' }, { id: 86, firstName: 'Paul', lastName: 'Dunne', tier: 'D' }, { id: 87, firstName: 'Bradley', lastName: 'Dredge', tier: 'D' }, { id: 88, firstName: 'Brandon', lastName: 'Stone', tier: 'D' }, { id: 89, firstName: 'Chan', lastName: 'Kim', tier: 'D' }, { id: 90, firstName: 'Chez', lastName: 'Reavie', tier: 'D' }, { id: 91, firstName: 'Eddie', lastName: 'Pepperell', tier: 'D' }, { id: 92, firstName: 'Ernie', lastName: 'Els', tier: 'D' }, { id: 93, firstName: 'JT', lastName: 'Poston', tier: 'D' }, { id: 94, firstName: 'Joaquin', lastName: 'Niemann', tier: 'D', isAmateur: true }, { id: 95, firstName: 'Jordan', lastName: 'Niebrugge', tier: 'D' }, { id: 96, firstName: 'Maverick', lastName: 'McNealy', tier: 'D', isAmateur: true }, { id: 97, firstName: 'Richie', lastName: 'Ramsay', tier: 'D' }, { id: 98, firstName: 'Roberto', lastName: 'Castro', tier: 'D' }, { id: 99, firstName: 'Ted Potter', lastName: 'Jr.', tier: 'D' }, { id: 100, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' }, { id: 101, firstName: 'Aaron', lastName: 'Rai', tier: 'D' }, { id: 102, firstName: 'Angel', lastName: 'Cabrera', tier: 'D' }, { id: 103, firstName: 'Jonathan', lastName: 'Randolph', tier: 'D' }, { id: 104, firstName: 'Meen Whee', lastName: 'Kim', tier: 'D' }, { id: 105, firstName: 'Kyle', lastName: 'Thompson', tier: 'D' }, { id: 106, firstName: 'Matt', lastName: 'Wallace', tier: 'D' }, { id: 107, firstName: 'Satoshi', lastName: 'Kodaira', tier: 'D' }, { id: 108, firstName: 'Shugo', lastName: 'Imahira', tier: 'D' }, { id: 109, firstName: 'Thomas', lastName: 'Aiken', tier: 'D' }, { id: 110, firstName: 'Stephan', lastName: 'Jaeger', tier: 'D' }, { id: 111, firstName: 'Andres', lastName: 'Romero', tier: 'D' }, { id: 112, firstName: 'Brad', lastName: 'Dalke', tier: 'D' }, { id: 113, firstName: 'Brian', lastName: 'Stuard', tier: 'D' }, { id: 114, firstName: 'Corey', lastName: 'Conners', tier: 'D' }, { id: 115, firstName: 'Gene', lastName: 'Sauers', tier: 'D' }, { id: 116, firstName: 'Jack', lastName: 'Maguire', tier: 'D' }, { id: 117, firstName: 'Michael', lastName: 'Putnam', tier: 'D' }, { id: 118, firstName: 'Oliver', lastName: 'Bekker', tier: 'D' }, { id: 119, firstName: 'Sam', lastName: 'Ryder', tier: 'D' }, { id: 120, firstName: 'Scottie', lastName: 'Scheffler', tier: 'D', isAmateur: true }, { id: 121, firstName: 'Talor', lastName: 'Gooch', tier: 'D' }, { id: 122, firstName: 'Wade', lastName: 'Ormsby', tier: 'D' }, { id: 123, firstName: 'Xander', lastName: 'Schauffele', tier: 'D' }, { id: 124, firstName: 'Yusaku', lastName: 'Miyazato', tier: 'D' }, { id: 125, firstName: 'Daniel', lastName: 'Chopra', tier: 'D' }, { id: 126, firstName: 'Joel', lastName: 'Stalter', tier: 'D' }, { id: 127, firstName: 'Ben', lastName: 'Kohles', tier: 'D' }, { id: 128, firstName: 'Brice', lastName: 'Garnett', tier: 'D' }, { id: 129, firstName: 'Derek', lastName: 'Barron', tier: 'D' }, { id: 130, firstName: 'John', lastName: 'Oda', tier: 'D' }, { id: 131, firstName: 'Ryan', lastName: 'Brehm', tier: 'D' }, { id: 132, firstName: 'Scott', lastName: 'Gregory', tier: 'D', isAmateur: true }, { id: 133, firstName: 'Stewart', lastName: 'Hagestad', tier: 'D', isAmateur: true }, { id: 134, firstName: 'Troy', lastName: 'Merritt', tier: 'D' }, { id: 135, firstName: 'Andy', lastName: 'Pope', tier: 'D' }, { id: 136, firstName: 'Trey', lastName: 'Mullinax', tier: 'D' }, { id: 137, firstName: 'Alex', lastName: 'Smalley', tier: 'D', isAmateur: true }, { id: 138, firstName: 'Chris', lastName: 'Crawford', tier: 'D', isAmateur: true }, { id: 139, firstName: 'Daniel', lastName: 'Miernicki', tier: 'D' }, { id: 140, firstName: 'Garrett', lastName: 'Osborn', tier: 'D' }, { id: 141, firstName: 'Sahith', lastName: 'Theegala', tier: 'D', isAmateur: true }, { id: 142, firstName: 'Scott', lastName: 'Harvey', tier: 'D', isAmateur: true }, { id: 143, firstName: 'Matt', lastName: 'Campbell', tier: 'D' }, { id: 144, firstName: 'Tyson', lastName: 'Alexander', tier: 'D' }, { id: 145, firstName: 'Walker', lastName: 'Lee', tier: 'D', isAmateur: true }, { id: 146, firstName: 'Cameron', lastName: 'Champ', tier: 'D', isAmateur: true }, { id: 147, firstName: 'Kevin', lastName: 'Dougherty', tier: 'D' }, { id: 148, firstName: 'Mason', lastName: 'Andersen', tier: 'D', isAmateur: true }, { id: 149, firstName: 'Max', lastName: 'Greyserman', tier: 'D' }, { id: 150, firstName: 'Nick', lastName: 'Flanagan', tier: 'D' }, { id: 151, firstName: 'Roman', lastName: 'Robledo', tier: 'D' }];

var contestantData = [{ name: 'Adam Weiss', entries: [[1, 11, 39, 95], [2, 15, 43, 95], [6, 13, 34, 73]] }, { name: 'Cameron Weimer', entries: [[2, 20, 35, 82], [1, 15, 34, 95], [6, 12, 33, 75]] }, { name: 'Drew Serruto', entries: [[1, 12, 46, 68], [6, 11, 32, 62], [3, 20, 50, 69]] }, { name: 'Jon Frantz', entries: [[2, 21, 33, 63], [6, 20, 32, 68], [1, 31, 47, 69]] }, { name: 'Kevin Donoher', entries: [[1, 11, 36, 60], [5, 16, 43, 61], [6, 19, 50, 71]] }, { name: 'Kyle Bivenour', entries: [[2, 20, 32, 68], [1, 20, 58, 68], [6, 11, 33, 69]] }, { name: 'Matt Kilianski', entries: [[3, 12, 40, 64], [1, 27, 33, 68], [6, 27, 48, 62]] }, { name: 'Matt Weimer', entries: [[2, 12, 32, 95], [6, 13, 40, 62], [1, 20, 33, 75]] }, { name: 'Nate Heckmann', entries: [[4, 27, 50, 75], [6, 12, 47, 69], [2, 14, 33, 69]] }, { name: 'Neil Thompson', entries: [[1, 13, 46, 71], [2, 12, 34, 71], [3, 17, 34, 71]] }, { name: 'Ryan Boudouris', entries: [[4, 11, 48, 60], [3, 13, 38, 85], [1, 15, 32, 62]] }, { name: 'Nick Royer', entries: [[1, 11, 37, 62], [1, 15, 43, 74], [7, 15, 33, 62]] }, { name: 'Ryan Romes', entries: [[4, 25, 39, 62], [6, 15, 41, 60], [7, 18, 33, 75]] }, { name: 'Sean Buckle', entries: [[1, 12, 33, 67], [3, 11, 36, 68], [6, 12, 45, 75]] }, { name: 'Ian Horwich', entries: [[1, 17, 32, 71], [6, 25, 40, 61], [4, 16, 42, 94]] }, { name: 'David Prevo', entries: [[2, 20, 36, 77], [4, 22, 39, 68], [3, 13, 34, 69]] }];

exports.tourneyTitle = tourneyTitle;
exports.leaderboardUrl = leaderboardUrl;
exports.golferData = golferData;
exports.contestantData = contestantData;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(127);

var _app = __webpack_require__(117);

var _app2 = _interopRequireDefault(_app);

var _dataService = __webpack_require__(118);

var _dataService2 = _interopRequireDefault(_dataService);

var _gotoService = __webpack_require__(121);

var _gotoService2 = _interopRequireDefault(_gotoService);

var _notificationService = __webpack_require__(123);

var _notificationService2 = _interopRequireDefault(_notificationService);

var _settingsService = __webpack_require__(126);

var _settingsService2 = _interopRequireDefault(_settingsService);

var _golfersComponent = __webpack_require__(120);

var _golfersComponent2 = _interopRequireDefault(_golfersComponent);

var _footerComponent = __webpack_require__(119);

var _footerComponent2 = _interopRequireDefault(_footerComponent);

var _headerComponent = __webpack_require__(122);

var _headerComponent2 = _interopRequireDefault(_headerComponent);

var _poolComponent = __webpack_require__(124);

var _poolComponent2 = _interopRequireDefault(_poolComponent);

var _settingsComponent = __webpack_require__(125);

var _settingsComponent2 = _interopRequireDefault(_settingsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.service('dataService', _dataService2.default);
_app2.default.service('gotoService', _gotoService2.default);
_app2.default.service('notificationService', _notificationService2.default);
_app2.default.service('settingsService', _settingsService2.default);

_app2.default.component('golfers', _golfersComponent2.default);
_app2.default.component('gpFooter', _footerComponent2.default);
_app2.default.component('gpHeader', _headerComponent2.default);
_app2.default.component('pool', _poolComponent2.default);
_app2.default.component('settings', _settingsComponent2.default);

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(335)(undefined);
// imports


// module
exports.push([module.i, "body {\n    font-size: 12px;\n}\n\n.logo {\n    display: inline;\n    margin-right: 5px;\n}\n\n.logo img {\n    bottom: 8px;\n    position: relative;\n    width: 20px;\n    margin-bottom: -14px;\n}\n\ntable th.movement:before {\n    content: \"\\2191\";/*\"\\2B06\";*/\n}\ntable th.movement:after {\n    content: \"\\2193\";\n}\ntable td.negative {\n    color: #d00;\n}\ntable td.negative:before {\n    content: \"\\2193\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable td.positive {\n    color: #094;\n}\ntable td.positive:before {\n    content: \"\\2191\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable tr.selected {\n    border: 2px solid black;\n}\ntable tr.selected:first-child {\n    border-top-width: 3px;\n}\n\n@media only screen and (max-width: 375px) {\n    .pool-leaderboard table td, .pool-leaderboard table th {\n        max-width: 50px;\n        word-wrap: break-word;\n        font-size: 10px;\n    }\n\n    .golfer-leaderboard table td, .golfer-leaderboard table th {\n        max-width: 40px;\n        word-wrap: break-word;\n        font-size: 8px;\n    }\n}\n\n\n.golfer-score {\n    cursor: pointer;;\n}\n.settings {\n    margin: 20px 0;\n}\n.settings .form-control {\n    font-size: 16px;\n}\n.navbar .navbar-brand img {\n    height: 25px;\n}", ""]);

// exports


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(337);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 335:
/***/ (function(module, exports) {

function cssWithMappingToString(n,t){var o=n[1]||"",r=n[3];if(!r)return o;if(t&&"function"==typeof btoa){var e=toComment(r);return[o].concat(r.sources.map(function(n){return"/*# sourceURL="+r.sourceRoot+n+" */"})).concat([e]).join("\n")}return[o].join("\n")}function toComment(n){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"}module.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var o=cssWithMappingToString(t,n);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(n,o){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},e=0;e<this.length;e++){var i=this[e][0];"number"==typeof i&&(r[i]=!0)}for(e=0;e<n.length;e++){var u=n[e];"number"==typeof u[0]&&r[u[0]]||(o&&!u[2]?u[2]=o:o&&(u[2]="("+u[2]+") and ("+o+")"),t.push(u))}},t};

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

module.exports=function(r){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!r||"string"!=typeof r)return r;var t=e.protocol+"//"+e.host,n=t+e.pathname.replace(/\/[^\/]*$/,"/");return r.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(r,e){var i=e.trim().replace(/^"(.*)"$/,function(r,e){return e}).replace(/^'(.*)'$/,function(r,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return r;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:n+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})};

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logo.png";

/***/ })

},[135]);
//# sourceMappingURL=bundle.js.map