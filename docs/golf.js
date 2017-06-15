/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logo.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)
module.exports = 'angulartics.google.analytics'


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = 'angulartics';


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(19)(content, options);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon_ico__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__favicon_ico__);





__WEBPACK_IMPORTED_MODULE_0__config__["a" /* contestantData */].forEach((c, i) => c.id = i);

const app = angular.module('golfPool', ['ngSanitize', 'ngRoute', 'angulartics', 'angulartics.google.analytics'])
	.constant('GOLFERS', __WEBPACK_IMPORTED_MODULE_0__config__["b" /* golferData */])
	.constant('CONTESTANTS', __WEBPACK_IMPORTED_MODULE_0__config__["a" /* contestantData */])
	.constant('REFRESH_TIME', 60000)
	.constant('LEADERBOARD_URL', __WEBPACK_IMPORTED_MODULE_0__config__["c" /* leaderboardUrl */])
	.constant('TOURNEY_TITLE', __WEBPACK_IMPORTED_MODULE_0__config__["d" /* tourneyTitle */])
	.constant('MOVEMENT', {
		positive: 'positive',
		negative: 'negative',
		none: 'none'
	})
	.config(($routeProvider) => {
		$routeProvider.when('/', { 
			template: '<pool></pool>'
		}).when('/golfers', { 
			template: '<golfers></golfers>'
		}).when('/settings', { 
			template: '<settings></settings>'
		});
	})
	.run(($rootScope, TOURNEY_TITLE) => {
		$rootScope.getTitle = () => $rootScope.positions ? $rootScope.positions + ' - ' + TOURNEY_TITLE + ' Player Pool' : TOURNEY_TITLE + ' Player Pool';
		$rootScope.faviconUrl = __WEBPACK_IMPORTED_MODULE_1__favicon_ico___default.a;
	});

/* harmony default export */ __webpack_exports__["a"] = (app);	

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const service = function($http, GOLFERS, CONTESTANTS, MOVEMENT, LEADERBOARD_URL, settingsService, notificationService, $rootScope) {

	const entries = CONTESTANTS
		.map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
		.reduce((prev, curr) => prev.concat(curr));

	let previousEntries = null

	this.get = () => {
		return getGolferScores().then(golferScores => {
			const newEntries = createEntriesWithScores(golferScores);
            notificationService.update(previousEntries, newEntries);
            updateTitle(newEntries);
            previousEntries = newEntries;
			return { entries: newEntries, golfers: golferScores };
		});
	};

	const updateTitle = (entries) => {
		const selectedContestantId = settingsService.getSelectedContestantId();
		if (selectedContestantId >= 0) {
			const positions = entries.filter(e => e.contestantId === selectedContestantId && !e.isDQ)
				.map(e => e.position)
				.reduce((c, n) => c !== null ? c + ', ' + n : n , null);

			$rootScope.positions = positions;
		} else {
			$rootScope.positions = null;
		}
	};

	const getGolferScores = () => {
		return $http({
			method: 'GET',
			url: LEADERBOARD_URL
		}).then(response => {
			const scorePage = $(response.data);
			const golferRows = scorePage.find('.leaderboard-table .player-overview');
			const scores = [];

			golferRows.each(function(index) {
				scores.push(extract($(this), index));
			});

			const golfersWithScores = GOLFERS.map(golfer => {
				const firstName = golfer.firstName.toLowerCase();
				const lastName = golfer.lastName.toLowerCase();
				const score = scores.find(score => {
					const fullName = score.fullName.toLowerCase();
					return fullName.includes(firstName) && fullName.includes(lastName);
				});

				const golferCopy = angular.copy(golfer);
				if (score) {
					golferCopy.score = score;
				} else {
					golferCopy.score = emptyScore(golfer);
				}

				const selectedContestantId = settingsService.getSelectedContestantId();
				golferCopy.entryCount = entries.filter(e => e.golferIds.includes(golferCopy.id)).length;;
				golferCopy.isSelected = entries.some(e => e.golferIds.includes(golferCopy.id) && e.contestantId === selectedContestantId);

				return golferCopy;
			});
			
			return golfersWithScores;
		});
	};

	const emptyScore = (golfer) => {
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
			shortName: `${golfer.firstName[0]}. ${golfer.lastName}`,
			logoImage: '',
			startTime: null,
			movement:  { text: '-', direction: MOVEMENT.none }
		}
	}

	const extract = (row, index) => {
		let isDNF = false;

		const toPar = row.find('.relativeScore').text();
		let relativeScore = toPar === 'E' ? 0 : parseInt(toPar);
		if (isNaN(relativeScore)) {
			relativeScore = Number.MAX_SAFE_INTEGER;
			isDNF = true;
		}

		const total = row.find('.totalScore').text();
		let totalScore = total === '--' ? 0 : parseInt(total);
		if (isNaN(totalScore)) {
			totalScore = Number.MAX_SAFE_INTEGER;
		}

		const thru = row.find('.thru').text();
		let startTime;
		if (thru === '') {
			let time = row.find('.thru .date-container').attr('data-date');
			startTime = new Date(time);
		} else {
			startTime = null;
		}

		const position = row.find('.position').text();
		const currentRoundScore = row.find('.currentRoundScore').text();
		
		const round1Score = row.find('.round1').text();
		const round2Score = row.find('.round2').text();
		const round3Score = row.find('.round3').text();
		const round4Score = row.find('.round4').text();
		const fullName = row.find('.full-name').text();
		const shortName = row.find('.short-name').text();
		const logoImage = row.find('.team-logo img').attr('src');

		const movementElement = row.find('.movement');
		const movementText = movementElement.text();
		let movementDirection;
		if (movementElement.hasClass('positive')) {
			movementDirection = MOVEMENT.positive;
		} else if (movementElement.hasClass('negative')) {
			movementDirection = MOVEMENT.negative;
		} else {
			movementDirection = MOVEMENT.none;
		}

		return {
			index,
			isDNF,
			toPar,
			relativeScore,
			total,
			totalScore,
			position,
			currentRoundScore,
			thru,
			round1Score,
			round2Score,
			round3Score,
			round4Score,
			fullName,
			shortName,
			logoImage,
			startTime,
			movement: {
				text: movementText,
				direction: movementDirection
			}
		};
	};

	const createEntriesWithScores = (golferScores) => {
		const entriesWithScores= entries.map(entry => {
			const entryGolfers = entry.golferIds.map(gid => angular.copy(golferScores.find(golfer => golfer.id === gid)));
			let overallRelativeScore, overallTotalScore, overallToPar;
			const isDQ = entryGolfers.filter(golfer => golfer.score.isDNF).length > 1;
			const selectedContestantId = settingsService.getSelectedContestantId();
			const isSelected = entry.contestantId === selectedContestantId;

			if (!isDQ) {
				const worstGolfers = _.orderBy(entryGolfers, ['score.relativeScore', 'score.totalScore', 'id'], ['desc', 'desc', 'desc']);
				worstGolfers[0].throwaway = true;

				overallRelativeScore = entryGolfers
					.filter(golfer => golfer.throwaway !== true)
					.reduce((prev, curr) => prev + curr.score.relativeScore, 0);

				overallTotalScore = entryGolfers
					.filter(golfer => golfer.throwaway !== true)
					.reduce((prev, curr) => prev + curr.score.totalScore, 0).toString();

				overallToPar = overallRelativeScore === 0 ? 'E' : overallRelativeScore.toString();
			} else {
				overallRelativeScore = Number.MAX_SAFE_INTEGER;
				overallTotalScore = '--';
				overallToPar = '--';
			}
			
			return {
				name: entry.name,
				golfers: entryGolfers,
				overallRelativeScore,
				overallTotalScore,
				overallToPar,
				isDQ,
				isSelected,
				contestantId: entry.contestantId
			};
		});

		return addPositions(entriesWithScores);
	};

	const addPositions = entriesWithScores => {
		const sortedEntries = _.sortBy(entriesWithScores, ['overallRelativeScore', 'overallTotalScore']);

		let position = 1;
		let lastScore = 0;
		sortedEntries.forEach((entry, index) => {
			const isTied = sortedEntries.filter(e => e.overallRelativeScore === entry.overallRelativeScore).length > 1;
			if (entry.overallRelativeScore > lastScore) {
				position = index + 1;
			} 
 			entry.position = isTied ? 'T' + position : position.toString() ;
 			entry.positionNumber = position;
 			lastScore = entry.overallRelativeScore;
		})

		return sortedEntries;
	}

};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const template = `
<footer>
  <span ng-bind="::$ctrl.refreshTime">
</footer>`;


const controller = function(REFRESH_TIME) {
    this.$onInit = () => {
        this.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
    };
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller });

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const template = `
<div class="golfer-leaderboard">
<table class="table table-striped table-responsive table-condensed">
	<thead>
	<tr>
		<th>Pos</th><th class="movement"></th><th>Player</th><th>Entries</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>
	</tr>
	</thead>
	<tbody>
		<tr ng-repeat="golfer in $ctrl.golfers track by $index" ng-attr-id="golfer-{{golfer.id}}" ng-class="{'success': golfer.isHighlighted, 'selected': golfer.isSelected}">
			<td ng-bind="golfer.score.position"></td>
			<td ng-class="golfer.score.movement.direction" ng-bind="golfer.score.movement.text"></td>
			<td><div ng-if="golfer.score.logoImage" class="logo"><img ng-src="{{golfer.score.logoImage}}" /></div><span ng-bind="$ctrl.getName(golfer)"></span></td>
			<td ng-bind="golfer.entryCount"></td>
			<td ng-bind="golfer.score.toPar"></td>
			<td ng-bind="golfer.score.currentRoundScore"></td>
			<td ng-if="golfer.score.thru" ng-bind="golfer.score.thru"></td>
			<td ng-if="!golfer.score.thru" ng-bind="golfer.score.startTime | date:'shortTime'"></td>
			<td ng-bind="golfer.score.round1Score"></td>
			<td ng-bind="golfer.score.round2Score"></td>
			<td ng-bind="golfer.score.round3Score"></td>
			<td ng-bind="golfer.score.round4Score"></td>
			<td ng-bind="golfer.score.total"></td>
		</tr>
	</tbody>
</table>
</div>`;

const controller = function(dataService, $interval, REFRESH_TIME, $anchorScroll, $timeout, gotoService) {
	const refreshData = () => {
		return dataService.get().then(data => {
			this.golfers = _.sortBy(data.golfers, g => g.score.index)
		});
	};

	const scrollHighlightGolfer = () => {
		const golferId = gotoService.getGotoGolferId();
		if (golferId) {
			$timeout(() => $anchorScroll('golfer-' + golferId), 10);
			const golfer = this.golfers.find(g => g.id === golferId);
			if (golfer) {
				golfer.isHighlighted = true;
				$timeout(() => golfer.isHighlighted = false, 3000);
			}
		}
	}

	let stop;
	this.$onInit = () => {
		refreshData().then(() => scrollHighlightGolfer());
		stop = $interval(() => refreshData(), REFRESH_TIME);		
	};

	this.$onDestroy = () => {
		if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
        }
	};

	this.getName = golfer => {
		return `${golfer.firstName} ${golfer.lastName}${golfer.isAmateur ? ' (A)' : ''}`;
	};
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller });

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const service = function($location) {
    let gotoGolferId = null;

    this.gotoGolfer = (id) => {
        gotoGolferId = id;
        $location.url('/golfers');
    };

    this.getGotoGolferId = () => {
        const id = gotoGolferId;
        gotoGolferId = null;
        return id;
    };
};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logo_png__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__logo_png__);




const template = `
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
         <img alt="Golf Pool" ng-src="{{::$ctrl.logoUrl}}">
      </a>
    </div>

    <div class="collapse navbar-collapse" id="navbar-collapse">
      <ul class="nav navbar-nav">
        <li ng-class="{'active': $ctrl.currentRoute() === 'pool'}"><a href="/">Pool</a></li>
        <li ng-class="{'active': $ctrl.currentRoute() === 'golfers'}"><a href="#!/golfers">Golfers</a></li>
        <li ng-class="{'active': $ctrl.currentRoute() === 'settings'}"><a href="#!/settings">Settings</a></li>
      </ul>
    </div>
  </div>
</nav>`;


const controller = function($location) {
    this.currentRoute = () => {
        if ($location.path() === '/') {
            return 'pool';
        } else if ($location.path() === '/golfers') {
            return 'golfers';
        } else if ($location.path() === '/settings') {
            return 'settings';
        }

        return '';
    };

    this.$onInit = () => {
        this.logoUrl = __WEBPACK_IMPORTED_MODULE_0__logo_png___default.a;
    };
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller });

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logo_png__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__logo_png__);




const service = function(settingsService, $rootScope) {

	const status = {
		supported: Boolean('Notification' in window),
		granted: false
	}

	if (status.supported) {
		Notification.requestPermission().then(result => {
			$rootScope.$applyAsync(() => status.granted = result === 'granted');
		});
	}

	this.getStatus = () => status;

	this.update = (previousEntries, currentEntries) => {
		const selectedContestantId = settingsService.getSelectedContestantId();
		if (!status.supported || selectedContestantId < 0 || !previousEntries) {
			return;
		}

		const previousPositions = previousEntries.filter(e => e.contestantId === selectedContestantId).map(e => e.positionNumber);
		const currentPositions = currentEntries.filter(e => e.contestantId === selectedContestantId).map(e => e.positionNumber);

		if (previousPositions.some(p => p === 1 || p === 2) && !currentPositions.some(p => p === 1 || p === 2)) {
			showNotification(false);
		} else if (!previousPositions.some(p => p === 1 || p === 2) && currentPositions.some(p => p === 1 || p === 2)) {
			showNotification(true);
		}
	};

	const showNotification = (inTopTwo) => {
		Notification.requestPermission().then(result => {
			if (result === 'granted') {
				status.granted = true;
				const title = inTopTwo ? 'You\'ve moved into the top 2!' : 'You\'ve dropped out of the top 2.';
				const options = { 
					icon: __WEBPACK_IMPORTED_MODULE_0__logo_png___default.a
				};
				const notification = new Notification(title, options);
			} else {
				status.granted = false;
			}
		});
	};
};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const template = `
<div class="pool-leaderboard">
<table class="table table-responsive table-condensed">
	<thead><tr>
		<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>To Par</th>
	</tr></thead>
	<tbody>
		<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ, selected: entry.isSelected}">
			<td ng-bind="entry.position"></td>
			<td ng-bind="entry.name"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[0])" ng-class="entry.golfers[0].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[1])" ng-class="entry.golfers[1].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[2])" ng-class="entry.golfers[2].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[3])" ng-class="entry.golfers[3].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>
			<th ng-bind="entry.overallToPar"></th>
		</tr>
	</tbody>
</table>
</div>`;

const controller = function(dataService, $interval, REFRESH_TIME, $filter, gotoService) {
	const dateFilter = $filter('date');

	const refreshData = () => {
		dataService.get().then(data => {
			this.entries = data.entries;
		});
	};

	let stop;
	this.$onInit = () => {
		refreshData();
		stop = $interval(() => refreshData(), REFRESH_TIME);		
	};

	this.$onDestroy = () => {
		if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
        }
	};

	this.getGolferInfo = (entry, index) => {
		const golfer = entry.golfers[index];
		const info = `${golfer.score.shortName}${golfer.isAmateur ? ' (A)' : ''}: ${golfer.score.toPar} (${golfer.score.thru ? golfer.score.thru : dateFilter(golfer.score.startTime, 'shortTime')})`
		return info;
	};

	this.gotoGolfer = golfer => {
		gotoService.gotoGolfer(golfer.id);
	};
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const template = `
<form class="settings">
  <div class="form-group">
    <label for="contestantDropdown">Selected Contestant: </label>
    <select id="contestantDropdown" class="form-control" ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">
		<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>
	</select>
  </div>
  <div class="checkbox">
    <label>
      <input disabled type="checkbox" ng-checked="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted"> Notifications Enabled
      <span ng-if="$ctrl.notificationStatus.supported && !$ctrl.notificationStatus.granted">(To turn on notifications, go into your browser settings and enable them for this domain)</span>
      <span ng-if="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted">(To turn off notifications, go into your browser settings and disable them for this domain)</span>
      <span ng-if="!$ctrl.notificationStatus.supported">(You browser does not support notifications)</span>
    </label>
  </div>
</form>`;

const controller = function(CONTESTANTS, settingsService, notificationService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
    this.notificationStatus = notificationService.getStatus();
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller });

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const service = function(TOURNEY_TITLE) {
	const hasLocalStorage = typeof(Storage) !== 'undefined';
	const selectedContestantKey = TOURNEY_TITLE + '-selectedContestantId';
	const enableNotifactionsKey = 'enableNotifactions';

	this.getSelectedContestantId = () => {
		if (!hasLocalStorage || !localStorage.getItem(selectedContestantKey)) {
			return -1;
		}

		return parseInt(localStorage.getItem(selectedContestantKey));
	};

	this.setSelectedContestantId = value => {
		localStorage.setItem(selectedContestantKey, value)
	};

	this.getEnableNotifications = () => {
		if (!hasLocalStorage || !localStorage.getItem(enableNotifactionsKey)) {
			return true;
		}

		return localStorage.getItem(enableNotifactionsKey) === "true";
	};

	this.setEnableNotifications = value => {
		localStorage.setItem(enableNotifactionsKey, value)
	};

};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc overview
 * @name angulartics.google.analytics
 * Enables analytics support for Google Analytics (http://google.com/analytics)
 */
angular.module('angulartics.google.analytics', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {

  // GA already supports buffered invocations so we don't need
  // to wrap these inside angulartics.waitForVendorApi
  $analyticsProvider.settings.pageTracking.trackRelativePath = true;
  
  // Set the default settings for this module
  $analyticsProvider.settings.ga = {
    additionalAccountNames: undefined,
    // Select hits to send to all additional accounts
    additionalAccountHitTypes: {
      pageview: true,
      event: true,
      exception: false,
      ecommerce: false,
      userTiming: false,
      setUserProperties: false,
      userId: false
    },
    disableEventTracking: null,
    disablePageTracking: null,
    enhancedEcommerce: false, 
    // GA supports transporting data via gif requests, XHRs, or sendBeacons
    // @link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport
    transport: null,
    userId: null
  };

  /**
   * Track Pageview in GA
   * @name pageTrack
   *
   * @param {string} path value of Page dimension stored with hit e.g. '/home'
   * @param {object} properties Object with optional addtional Custom Dimensions/Metrics
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
   * @link https://developers.google.com/analytics/devguides/collection/gajs/
   */
  $analyticsProvider.registerPageTrack(function (path, properties) {
    
    properties = properties || {};

    // Do nothing if page tracking is disabled
    if ($analyticsProvider.settings.ga.disablePageTracking) return;

    dispatchToGa('pageview', 'send', angular.extend({}, properties, {
      hitType: 'pageview',
      page: path
    }));

  });

  /**
   * Track Event in GA
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'nonInteraction' (boolean)
   *
   * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  $analyticsProvider.registerEventTrack(function(action, properties) {

    // Do nothing if event tracking is disabled
    if ($analyticsProvider.settings.ga.disableEventTracking) return;

    if (!action && action + '' !== '0') {
      return;
    }

    // Sets default properties
    properties = properties || {};
    properties.category = properties.category || 'Event';

    // GA requires that eventValue be an integer, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    // https://github.com/luisfarzati/angulartics/issues/81
    if (properties.value) {
      var parsed = parseInt(properties.value, 10);
      properties.value = isNaN(parsed) ? 0 : parsed;
    }

    // GA requires that hitCallback be an function, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#hitcallback
    if (!angular.isFunction(properties.hitCallback)) {
      properties.hitCallback = null;
    }

    // Making nonInteraction parameter more intuitive, includes backwards compatibilty
    // https://github.com/angulartics/angulartics-google-analytics/issues/49
    properties.nonInteraction = properties.nonInteraction || properties.noninteraction;

    dispatchToGa('event', 'send', angular.extend({}, properties, {
      hitType: 'event',
      eventCategory: properties.category,
      eventAction: action,
      eventLabel: properties.label,
      eventValue: properties.value,
      nonInteraction: properties.nonInteraction,
      page: properties.page || window.location.hash.substring(1) || window.location.pathname,
      hitCallback: properties.hitCallback,
    }));

  });

  /**
   * Exception Track Event in GA
   * @name exceptionTrack
   * Sugar on top of the eventTrack method for easily handling errors
   *
   * @param {object} error An Error object to track: error.toString() used for event 'action', error.stack used for event 'label'.
   * @param {object} cause The cause of the error given from $exceptionHandler, not used.
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  $analyticsProvider.registerExceptionTrack(function (error, cause) {
    dispatchToGa('exception', 'send', {
      hitType: 'event',
      eventCategory: 'Exceptions',
      eventAction: error.toString(),
      eventLabel: error.stack,
      nonInteraction: true,
      page: window.location.hash.substring(1) || window.location.pathname,
      isException: true
    });
  });

  /**
   * Set Username
   * @name setUsername
   *
   * @param {string} userId Registers User ID of user for use with other hits
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#user_id
   */
  $analyticsProvider.registerSetUsername(function (userId) {
    $analyticsProvider.settings.ga.userId = userId;
  });

  /**
   * Set User Properties
   * @name setUserProperties
   *
   * @param {object} properties Sets all properties with dimensionN or metricN to their respective values
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#customs
   */
  $analyticsProvider.registerSetUserProperties(function (properties) {

    if (properties) {
      dispatchToGa('setUserProperties', 'set', dimensionsAndMetrics(properties));
    }

  });

  /**
   * User Timings Event in GA
   * @name userTimings
   *
   * @param {object} properties Comprised of the mandatory fields:
   *     'timingCategory' (string),
   *     'timingVar' (string),
   *     'timingValue' (number)
   * Properties can also have the optional fields:
   *     'timingLabel' (string)
   *     'optSampleRate' (number) Classic Analytics only - determines % of users to collect data from, handled serverside by UA
   *     @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings#sampling_considerations
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
   */
  $analyticsProvider.registerUserTimings(function (properties) {

    if (!angular.isObject(properties) || angular.isArray(properties)) {
      return console.log('Required argument properties is missing or not an object');
    }

    angular.forEach(['timingCategory', 'timingVar', 'timingValue'], function(prop) {
      if (angular.isUndefined(properties[prop])) {
        return console.log('Argument properties missing required property ' + prop);
      }
    });

    dispatchToGa('userTiming', 'send', {
      hitType: 'timing',
      timingCategory: properties.timingCategory,
      timingVar: properties.timingVar,
      timingValue: properties.timingValue,
      timingLabel: properties.timingLabel,
      optSampleRate: properties.optSampleRate,  // Classic Analytics only
      page: properties.page || window.location.hash.substring(1) || window.location.pathname,
    });

  });

  /**
   * Ecommerce Tracking in GA
   * @name transactionTrack
   *
   * @param {object} transaction comprised of following fields:
   *     'id': 'T12345',                         // Transaction ID. Required for purchases and refunds.
   *     'affiliation': 'Online Store',
   *     'revenue': '35.43',                     // Total transaction value (incl. tax and shipping)
   *     'tax':'4.90',
   *     'shipping': '5.99',
   *     'coupon': 'SUMMER_SALE',                // Enhanced Ecommerce Only
   *     'dimension1': 'Card ID #1234',          // Hit, Session, or User-level Custom Dimension(s)
   *     'metric1': 1,                           // Custom Metric(s)
   *     'currencyCode': 'EUR',                  // Currency Code to track the transaction with. Recognized codes: https://support.google.com/analytics/answer/6205902?hl=en#supported-currencies
   *     'billingCity': 'San Francisco',                // Classic Analytics only
   *     'billingRegion': 'California',                 // Classic Analytics only
   *     'billingCountry': 'USA',                       // Classic Analytics only
   *     'products': [{                            // List of products
   *       'name': 'Triblend Android T-Shirt',     // Name or ID is required.
   *       'id': '12345',                          // Product SKU
   *       'price': '15.25',
   *       'brand': 'Google',                      // Enhanced Ecommerce only
   *       'category': 'Apparel',                 
   *       'variant': 'Gray',                      // Enhanced Ecommerce only
   *       'quantity': 1,
   *       'coupon': '',                           // Enhanced Ecommerce only.
   *       'currencyCode': 'BRL',                  // Product-level currency code, Enhanced Ecommerce only
   *       'dimension2': 'Clearance',              // Product-level Custom Dimension
   *       'metric2': 1                            // Product-level Custom Metric
   *      },
   *      ...
   *    ]
   *
   * @param {object] properties comprised of custom dimensions and metrics to
   * send with the transaction hit
   * Utilizes traditional ecommerce tracking by default. To used Enhanced Ecommerce,
   * set the $analytics.settings.ga.enhancedEcommerce flag to true
   *
   * Docs on traditional ecommerce (UA):
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
   *
   * Docs on Enhanced Ecommerce
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
   *
   * Docs on Classic Ecommerce (_gaq)
   * @link https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce
   **/
  $analyticsProvider.registerTransactionTrack(function(transaction) {

    var product;
    var i;

    // Universal Analytics splits off the ecommerce code into a separate
    // library we must include by using the "require" command
    dispatchToGa('ecommerce', 'require', 'ecommerce');
    dispatchToGa('ecommerce', 'ecommerce:addTransaction', transaction);
    
    if (transaction.products) {
      for (i = 0; i < transaction.products.length; i++) {

        product = transaction.products[i];

        // GA uses a SKU property and stores the transaction ID in the ID Field
        product.sku = product.id;
        product.id = transaction.id;

        dispatchToGa('ecommerce', 'ecommerce:addItem', transaction.products[i]);

      }
    }

    if (transaction.currencyCode) {

      dispatchToGa('ecommerce', '_set', transaction.currencyCode); // Classic Anayltics only - UA uses fieldsObj.currencyCode instead

    } 

    dispatchToGa('ecommerce', 'ecommerce:send', angular.copy(transaction));

  });

  /**
   * Detects if Universal Analytics is installed
   *
   * @name detectUniversalAnalytics
   */
  function detectUniversalAnalytics() {

    // Use the GoogleAnalyticsObject property set by the default GA snippet
    // to correctly determine the namespace of the GA global
    var gaNamespace = window.GoogleAnalyticsObject;
    return gaNamespace && window[gaNamespace];

  }

  /**
   * Detects if Classic Analytics is installed
   *
   * @name detectClassicAnalytics
   */
  function detectClassicAnalytics() {

    // If _gaq is undefined, we're trusting Classic Analytics to be there
    return !angular.isUndefined(window._gaq);

  }

  /**
   * Extract Custom Data for a hit
   * @name dimensionsAndMetrics
   * 
   * @param {object} properties properties object from an API call that is filtered for Custom Dimensions & Metrics
   *
   * @returns {object} customData object with only Custom Dimensions/Metrics from properties argument
   */
  function dimensionsAndMetrics(properties) {
    // add custom dimensions and metrics
    var customData = {};
    var key;

    for (key in properties) {
      // Keys must be dimensionXX or metricXX, e.g. dimension1, metric155, so
      // if those strings aren't at zero (which evaluates to falsey), ignore
      // the key
      if (!key.indexOf('dimension') || !key.indexOf('metric')) {
        customData[key] = properties[key];
      }
    }
    return customData;
  }

  /**
   * Handler for hits to GA. Dynamically adjusts syntax for
   * targeted version based on global detection.
   *
   * @name dispatchToGa
   *
   * @param {string} method Name of angulartics method for checking if hits should be duplicated
   * @param {string} command Standard Universal Analytics command (create, send, set)
   * @param {object} fieldsObj object with hit-specific fields. Fields are whitelisted in handler - non-supported fields are ignored.
   * 
   */
  var dispatchToGa = (function() {

    var handler;

    if (detectClassicAnalytics()) {
      handler = dispatchToClassic_;
    }

    if (detectUniversalAnalytics()) {
      handler = dispatchToUniversal_;
    }

    // If neither has been detected, GA is not above the angular code
    if (!handler) {
      return angular.noop;
    }

    return function(method, command, fieldsObj) {

      var shouldCopyHit = $analyticsProvider.settings.ga.additionalAccountHitTypes[method];
      handler(command, fieldsObj, shouldCopyHit);

    }

    /**
     * Dispatches a hit using Universal syntax
     *
     * @name dispatchToUniversal_
     * @private
     *  
     * @param {string} command Standard Universal Analytics command (create, send, set)
     * @param {object} fieldsObj object with hit-specific fields. Fields are whitelisted in handler - non-supported fields are ignored.
     * @param {boolean} shouldCopyHit should hit be propogated to all trackers
     */
    function dispatchToUniversal_(command, fieldsObj, shouldCopyHit) {

      var userId = $analyticsProvider.settings.ga.userId;
      var uaCommand,
          pluginName;

      if (command === 'require' && fieldsObj === 'ecommerce') {

        pluginName = fieldsObj;
  
        if ($analyticsProvider.settings.ga.enhancedEcommerce) {
  
          pluginName = 'ec';

        }
      
        // Exit here - require calls don't have fieldsObjs
        return applyUniversalCall_([command, pluginName], shouldCopyHit);

      }

      // If our User ID is set, set it on the hit
      if (userId && angular.isObject(fieldsObj)) fieldsObj.userId = userId;
      // If a transport preference is specified, set it on the hit
      if ($analyticsProvider.settings.ga.transport) {

        fieldsObj.transport = $analyticsProvider.settings.ga.transport;

      }

      if (command.indexOf('ecommerce:') > -1 && $analyticsProvider.settings.ga.enhancedEcommerce) {

        switch (command) {
          case 'ecommerce:addTransaction':
            command = ['ec:setAction', 'purchase'];
            break;
          case 'ecommerce:addItem':
            command = 'ec:addProduct';
            // Enhanced Ecommerce reverts to using the ID property for the SKU,
            // so we swap them back here
            fieldsObj.id = fieldsObj.sku;
            break;
          case 'ecommerce:send':
            command = 'send';
            fieldsObj.hitType = 'event';
            fieldsObj.eventCategory = 'Angulartics Enhanced Ecommerce';
            fieldsObj.eventAction = 'Purchase';
            fieldsObj.nonInteraction = true;
            break;
        }

      }


      uaCommand = command instanceof Array ? command.concat(fieldsObj) : [command, fieldsObj];

      applyUniversalCall_(uaCommand, shouldCopyHit);

    }

    /**
     * Handles applying a constructed call to the global Universal GA object
     * This exists primarily so calls within dispatchToUa_ can short circuit
     * out of the function to handle specific edge cases, e.g. require commands
     * @name applyUniversalCall_
     * @private
     *
     * @param commandArray {array} command to be .apply()'d
     * @param shouldCopyHit {boolean} should the command be applied to all accts
     */
    function applyUniversalCall_(commandArray, shouldCopyHit) {

      var userId = $analyticsProvider.settings.ga.userId;
      var gaNamespace = window.GoogleAnalyticsObject;
      var commandClone;

      // Perform our initial call
      window[gaNamespace].apply(this, commandArray);

      if (shouldCopyHit) {

        commandClone = angular.copy(commandArray);

        // If the userId shouldn't be duplicated, remove from the fieldsObj
        if (userId && !$analyticsProvider.settings.ga.additionalAccountHitTypes.userId) {
          
          if (commandClone[2] && typeof commandClone[2] === 'object') {

            delete commandClone[2].userId;

          }
  
        }

        angular.forEach($analyticsProvider.settings.ga.additionalAccountNames, function (accountName){
       
          commandClone[0] = accountName + '.' + commandClone[0];

          window[gaNamespace].apply(this, commandClone);

        }); 

      }

    }

    /**
     * Dispatches a hit using Classic syntax
     * Translates Universal Syntax to Classic syntax
     *
     * @name dispatchToClassic_
     * @private
     *  
     * @param {string} command Standard Universal Analytics command (create, send, set)
     * @param {object} fieldsObj object with hit-specific fields. Fields are whitelisted in handler - non-supported fields are ignored.
     * @param {boolean} shouldCopyHit should hit be propogated to all trackers
     */
    function dispatchToClassic_(command, fieldsObj, shouldCopyHit) {

      if (command === 'set') {
        return console.log('Classic Analytics does not support the "set" command or Custom Dimensions. Command ignored.');
      }

      var classicCommand;

      // Transpose our syntax from Universal Analytics to Classic Analytics
      // Currently we only support 'send' style commands
      if (command === 'send') {

        switch(fieldsObj.hitType) {
          case 'pageview':
            classicCommand = ['_trackPageview', fieldsObj.page];
            break;
          case 'event':
            classicCommand = [
              '_trackEvent',
              fieldsObj.category,
              fieldsObj.action,
              fieldsObj.label,
              fieldsObj.value,
              fieldsObj.nonInteraction
            ];
            break;
          case 'timing':
            classicCommand = [
              '_trackTiming',
              fieldsObj.timingCategory,
              fieldsObj.timingVar,
              fieldsObj.timingValue,
              fieldsObj.timingLabel,
              fieldsObj.optSampleRate
            ];
            break;
        }

      }

      if (command === 'ecommerce:addTransaction') {

        classicCommand = [
          '_addTrans',
          fieldsObj.id,
          fieldsObj.affiliation,
          fieldsObj.revenue,
          fieldsObj.tax,
          fieldsObj.shipping,
          fieldsObj.billingCity,
          fieldsObj.billingRegion,
          fieldsObj.billingCountry
        ];

      }

      if (command === 'ecommerce:addItem') { 

        classicCommand = [
          '_addItem',
          fieldsObj.id,
          fieldsObj.sku,
          fieldsObj.name,
          fieldsObj.category,
          fieldsObj.price,
          fieldsObj.quantity
        ];

      }

      if (command === '_set') {

        classicCommand = [
          '_set',
          'currencyCode',
          fieldsObj
        ];

      }

      if (command === 'ecommerce:send') {

        classicCommand = [
          '_trackTrans' 
        ];

      }

      if (!classicCommand) {
        return console.log('Unable to find command ' + command + ' or fieldsObj missing required properties. Command ignored.');
      }

      // Issue our command to GA
      window._gaq.push(classicCommand);

      if (shouldCopyHit) {

        angular.forEach($analyticsProvider.settings.ga.additionalAccountNames, function (accountName){
          
          var classicCommandClone = [].slice.call(classicCommand);
          // Namespace the command as required
          classicCommandClone[0] = accountName + '.' + classicCommandClone[0];

          window._gaq.push(classicCommandClone);

        });

      }

    }

  })();

}]);
})(window, window.angular);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * @license Angulartics
 * (c) 2013 Luis Farzati http://angulartics.github.io/
 * License: MIT
 */
(function(angular, analytics) {
'use strict';

var angulartics = window.angulartics || (window.angulartics = {});
angulartics.waitForVendorCount = 0;
angulartics.waitForVendorApi = function (objectName, delay, containsField, registerFn, onTimeout) {
  if (!onTimeout) { angulartics.waitForVendorCount++; }
  if (!registerFn) { registerFn = containsField; containsField = undefined; }
  if (!Object.prototype.hasOwnProperty.call(window, objectName) || (containsField !== undefined && window[objectName][containsField] === undefined)) {
    setTimeout(function () { angulartics.waitForVendorApi(objectName, delay, containsField, registerFn, true); }, delay);
  }
  else {
    angulartics.waitForVendorCount--;
    registerFn(window[objectName]);
  }
};

/**
 * @ngdoc overview
 * @name angulartics
 */
angular.module('angulartics', [])
.provider('$analytics', $analytics)
.run(['$rootScope', '$window', '$analytics', '$injector', $analyticsRun])
.directive('analyticsOn', ['$analytics', analyticsOn])
.config(['$provide', exceptionTrack]);

function $analytics() {
  var vm = this;

  var settings = {
    pageTracking: {
      autoTrackFirstPage: true,
      autoTrackVirtualPages: true,
      trackRelativePath: false,
      trackRoutes: true,
      trackStates: true,
      autoBasePath: false,
      basePath: '',
      excludedRoutes: [],
      queryKeysWhitelisted: [],
      queryKeysBlacklisted: []
    },
    eventTracking: {},
    bufferFlushDelay: 1000, // Support only one configuration for buffer flush delay to simplify buffering
    trackExceptions: false,
    optOut: false,
    developerMode: false // Prevent sending data in local/development environment
  };

  // List of known handlers that plugins can register themselves for
  var knownHandlers = [
    'pageTrack',
    'eventTrack',
    'exceptionTrack',
    'transactionTrack',
    'setAlias',
    'setUsername',
    'setUserProperties',
    'setUserPropertiesOnce',
    'setSuperProperties',
    'setSuperPropertiesOnce',
    'incrementProperty',
    'userTimings',
    'clearCookies'
  ];
  // Cache and handler properties will match values in 'knownHandlers' as the buffering functons are installed.
  var cache = {};
  var handlers = {};
  var handlerOptions = {};

  // General buffering handler
  function bufferedHandler(handlerName){
    return function(){
      if(angulartics.waitForVendorCount){
        if(!cache[handlerName]){ cache[handlerName] = []; }
        cache[handlerName].push(arguments);
      }
    };
  }

  // As handlers are installed by plugins, they get pushed into a list and invoked in order.
  function updateHandlers(handlerName, fn, options){
    if(!handlers[handlerName]){
      handlers[handlerName] = [];
    }
    handlers[handlerName].push(fn);
    handlerOptions[fn] = options;
    return function(){
      if(!this.settings.optOut) {
        var handlerArgs = Array.prototype.slice.apply(arguments);
        return this.$inject(['$q', angular.bind(this, function($q) {
          return $q.all(handlers[handlerName].map(function(handlerFn) {
            var options = handlerOptions[handlerFn] || {};
            if (options.async) {
              var deferred = $q.defer();
              var currentArgs = angular.copy(handlerArgs);
              currentArgs.unshift(deferred.resolve);
              handlerFn.apply(this, currentArgs);
              return deferred.promise;
            } else{
              return $q.when(handlerFn.apply(this, handlerArgs));
            }
          }, this));
        })]);
      }
    };
  }

  // The api (returned by this provider) gets populated with handlers below.
  var api = {
    settings: settings
  };

  // Opt in and opt out functions
  api.setOptOut = function(optOut) {
    this.settings.optOut = optOut;
    triggerRegister();
  };

  api.getOptOut = function() {
    return this.settings.optOut;
  };


  // Will run setTimeout if delay is > 0
  // Runs immediately if no delay to make sure cache/buffer is flushed before anything else.
  // Plugins should take care to register handlers by order of precedence.
  function onTimeout(fn, delay){
    if(delay){
      setTimeout(fn, delay);
    } else {
      fn();
    }
  }

  var provider = {
    $get: ['$injector', function($injector) {
      return apiWithInjector($injector);
    }],
    api: api,
    settings: settings,
    virtualPageviews: function (value) { this.settings.pageTracking.autoTrackVirtualPages = value; },
    trackStates: function (value) { this.settings.pageTracking.trackStates = value; },
    trackRoutes: function (value) { this.settings.pageTracking.trackRoutes = value; },
    excludeRoutes: function(routes) { this.settings.pageTracking.excludedRoutes = routes; },
    queryKeysWhitelist: function(keys) { this.settings.pageTracking.queryKeysWhitelisted = keys; },
    queryKeysBlacklist: function(keys) { this.settings.pageTracking.queryKeysBlacklisted = keys; },
    firstPageview: function (value) { this.settings.pageTracking.autoTrackFirstPage = value; },
    withBase: function (value) {
      this.settings.pageTracking.basePath = (value) ? angular.element(document).find('base').attr('href') : '';
    },
    withAutoBase: function (value) { this.settings.pageTracking.autoBasePath = value; },
    trackExceptions: function (value) { this.settings.trackExceptions = value; },
    developerMode: function(value) { this.settings.developerMode = value; }
  };

  // General function to register plugin handlers. Flushes buffers immediately upon registration according to the specified delay.
  function register(handlerName, fn, options){
    // Do not add a handler if developerMode is true
    if (settings.developerMode) {
        return;
    }
    api[handlerName] = updateHandlers(handlerName, fn, options);
    var handlerSettings = settings[handlerName];
    var handlerDelay = (handlerSettings) ? handlerSettings.bufferFlushDelay : null;
    var delay = (handlerDelay !== null) ? handlerDelay : settings.bufferFlushDelay;
    angular.forEach(cache[handlerName], function (args, index) {
      onTimeout(function () { fn.apply(this, args); }, index * delay);
    });
  }

  function capitalize(input) {
      return input.replace(/^./, function (match) {
          return match.toUpperCase();
      });
  }

  //provide a method to inject services into handlers
  var apiWithInjector = function(injector) {
    return angular.extend(api, {
      '$inject': injector.invoke
    });
  };

  // Adds to the provider a 'register#{handlerName}' function that manages multiple plugins and buffer flushing.
  function installHandlerRegisterFunction(handlerName){
    var registerName = 'register'+capitalize(handlerName);
    provider[registerName] = function(fn, options){
      register(handlerName, fn, options);
    };
    api[handlerName] = updateHandlers(handlerName, bufferedHandler(handlerName));
  }

  function startRegistering(_provider, _knownHandlers, _installHandlerRegisterFunction) {
    angular.forEach(_knownHandlers, _installHandlerRegisterFunction);

    for (var key in _provider) {
      vm[key] = _provider[key];
    }
  }

  // Allow $angulartics to trigger the register to update opt in/out
  var triggerRegister = function() {
    startRegistering(provider, knownHandlers, installHandlerRegisterFunction);
  };

  // Initial register
  startRegistering(provider, knownHandlers, installHandlerRegisterFunction);

}

function $analyticsRun($rootScope, $window, $analytics, $injector) {

  function matchesExcludedRoute(url) {
    for (var i = 0; i < $analytics.settings.pageTracking.excludedRoutes.length; i++) {
      var excludedRoute = $analytics.settings.pageTracking.excludedRoutes[i];
      if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
        return true;
      }
    }
    return false;
  }

  function arrayDifference(a1, a2) {
    var result = [];
    for (var i = 0; i < a1.length; i++) {
      if (a2.indexOf(a1[i]) === -1) {
        result.push(a1[i]);
      }
    }
    return result;
  }

  function filterQueryString(url, keysMatchArr, thisType){
    if (/\?/.test(url) && keysMatchArr.length > 0) {
      var urlArr = url.split('?');
      var urlBase = urlArr[0];
      var pairs = urlArr[1].split('&');
      var matchedPairs = [];

      for (var i = 0; i < keysMatchArr.length; i++) {
        var listedKey = keysMatchArr[i];
        for (var j = 0; j < pairs.length; j++) {
          if ((listedKey instanceof RegExp && listedKey.test(pairs[j])) || pairs[j].indexOf(listedKey) > -1) matchedPairs.push(pairs[j]);
        }
      }

      var matchedPairsArr = (thisType == 'white' ? matchedPairs : arrayDifference(pairs,matchedPairs));
      if(matchedPairsArr.length > 0){
        return urlBase + '?' + matchedPairsArr.join('&');
      }else{
        return urlBase;
      }
    } else {
      return url;
    }
  }

  function whitelistQueryString(url){
    return filterQueryString(url, $analytics.settings.pageTracking.queryKeysWhitelisted, 'white');
  }

  function blacklistQueryString(url){
    return filterQueryString(url, $analytics.settings.pageTracking.queryKeysBlacklisted, 'black');
  }

  function pageTrack(url, $location) {
    if (!matchesExcludedRoute(url)) {
      url = whitelistQueryString(url);
      url = blacklistQueryString(url);
      $analytics.pageTrack(url, $location);
    }
  }

  if ($analytics.settings.pageTracking.autoTrackFirstPage) {
    $injector.invoke(['$location', function ($location) {
      /* Only track the 'first page' if there are no routes or states on the page */
      var noRoutesOrStates = true;
      if ($injector.has('$route')) {
         var $route = $injector.get('$route');
         if ($route) {
          for (var route in $route.routes) {
            noRoutesOrStates = false;
            break;
          }
         } else if ($route === null){
          noRoutesOrStates = false;
         }
      } else if ($injector.has('$state')) {
        var $state = $injector.get('$state');
        for (var state in $state.get()) {
          noRoutesOrStates = false;
          break;
        }
      }
      if (noRoutesOrStates) {
        if ($analytics.settings.pageTracking.autoBasePath) {
          $analytics.settings.pageTracking.basePath = $window.location.pathname;
        }
        if ($analytics.settings.pageTracking.trackRelativePath) {
          var url = $analytics.settings.pageTracking.basePath + $location.url();
          pageTrack(url, $location);
        } else {
          pageTrack($location.absUrl(), $location);
        }
      }
    }]);
  }

  if ($analytics.settings.pageTracking.autoTrackVirtualPages) {
    $injector.invoke(['$location', function ($location) {
      if ($analytics.settings.pageTracking.autoBasePath) {
        /* Add the full route to the base. */
        $analytics.settings.pageTracking.basePath = $window.location.pathname + "#";
      }
      var noRoutesOrStates = true;

      if ($analytics.settings.pageTracking.trackRoutes) {
        if ($injector.has('$route')) {
          var $route = $injector.get('$route');
          if ($route) {
            for (var route in $route.routes) {
              noRoutesOrStates = false;
              break;
            }
          } else if ($route === null){
            noRoutesOrStates = false;
          }
          $rootScope.$on('$routeChangeSuccess', function (event, current) {
            if (current && (current.$$route||current).redirectTo) return;
            var url = $analytics.settings.pageTracking.basePath + $location.url();
            pageTrack(url, $location);
          });
        }
      }

      if ($analytics.settings.pageTracking.trackStates) {
        if ($injector.has('$state') && !$injector.has('$transitions')) {
          noRoutesOrStates = false;
          $rootScope.$on('$stateChangeSuccess', function (event, current) {
            var url = $analytics.settings.pageTracking.basePath + $location.url();
            pageTrack(url, $location);
          });
        }
        if ($injector.has('$state') && $injector.has('$transitions')) {
          noRoutesOrStates = false;
          $injector.invoke(['$transitions', function($transitions) {
            $transitions.onSuccess({}, function($transition$) {
              var transitionOptions = $transition$.options();

              // only track for transitions that would have triggered $stateChangeSuccess
              if (transitionOptions.notify) {
                var url = $analytics.settings.pageTracking.basePath + $location.url();
                pageTrack(url, $location);
              }
            });
          }]);
        }
      }

        if (noRoutesOrStates) {
          $rootScope.$on('$locationChangeSuccess', function (event, current) {
            if (current && (current.$$route || current).redirectTo) return;
            if ($analytics.settings.pageTracking.trackRelativePath) {
              var url = $analytics.settings.pageTracking.basePath + $location.url();
              pageTrack(url, $location);
            } else {
              pageTrack($location.absUrl(), $location);
            }
          });
        }
    }]);
  }
  if ($analytics.settings.developerMode) {
    angular.forEach($analytics, function(attr, name) {
      if (typeof attr === 'function') {
        $analytics[name] = function(){};
      }
    });
  }
}

function analyticsOn($analytics) {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      var eventType = $attrs.analyticsOn || 'click';
      var trackingData = {};

      angular.forEach($attrs.$attr, function(attr, name) {
        if (isProperty(name)) {
          trackingData[propertyName(name)] = $attrs[name];
          $attrs.$observe(name, function(value){
            trackingData[propertyName(name)] = value;
          });
        }
      });

      angular.element($element[0]).bind(eventType, function ($event) {
        var eventName = $attrs.analyticsEvent || inferEventName($element[0]);
        trackingData.eventType = $event.type;

        if($attrs.analyticsIf){
          if(! $scope.$eval($attrs.analyticsIf)){
            return; // Cancel this event if we don't pass the analytics-if condition
          }
        }
        // Allow components to pass through an expression that gets merged on to the event properties
        // eg. analytics-properites='myComponentScope.someConfigExpression.$analyticsProperties'
        if($attrs.analyticsProperties){
          angular.extend(trackingData, $scope.$eval($attrs.analyticsProperties));
        }
        $analytics.eventTrack(eventName, trackingData);
      });
    }
  };
}

function exceptionTrack($provide) {
  $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
    return function (error, cause) {
      var result = $delegate(error, cause);
      var $analytics = $injector.get('$analytics');
      if ($analytics.settings.trackExceptions) {
        $analytics.exceptionTrack(error, cause);
      }
      return result;
    };
  }]);
}

function isCommand(element) {
  return ['a:','button:','button:button','button:submit','input:button','input:submit'].indexOf(
    element.tagName.toLowerCase()+':'+(element.type||'')) >= 0;
}

function inferEventType(element) {
  if (isCommand(element)) return 'click';
  return 'click';
}

function inferEventName(element) {
  if (isCommand(element)) return element.innerText || element.value;
  return element.id || element.name || element.tagName;
}

function isProperty(name) {
  return name.substr(0, 9) === 'analytics' && ['On', 'Event', 'If', 'Properties', 'EventType'].indexOf(name.substr(9)) === -1;
}

function propertyName(name) {
  var s = name.slice(9); // slice off the 'analytics' prefix
  if (typeof s !== 'undefined' && s!==null && s.length > 0) {
    return s.substring(0, 1).toLowerCase() + s.substring(1);
  }
  else {
    return s;
  }
}
})(angular);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(undefined);
// imports


// module
exports.push([module.i, "body {\n    font-size: 12px;\n}\n\n.logo {\n    display: inline;\n    margin-right: 5px;\n}\n\n.logo img {\n    bottom: 8px;\n    position: relative;\n    width: 20px;\n    margin-bottom: -14px;\n}\n\ntable th.movement:before {\n    content: \"\\2191\";/*\"\\2B06\";*/\n}\ntable th.movement:after {\n    content: \"\\2193\";\n}\ntable td.negative {\n    color: #d00;\n}\ntable td.negative:before {\n    content: \"\\2193\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable td.positive {\n    color: #094;\n}\ntable td.positive:before {\n    content: \"\\2191\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable tr.selected {\n    border: 2px solid black;\n}\ntable tr.selected:first-child {\n    border-top-width: 3px;\n}\n\n@media only screen and (max-width: 375px) {\n    .pool-leaderboard table td, .pool-leaderboard table th {\n        max-width: 50px;\n        word-wrap: break-word;\n        font-size: 10px;\n    }\n\n    .golfer-leaderboard table td, .golfer-leaderboard table th {\n        max-width: 40px;\n        word-wrap: break-word;\n        font-size: 8px;\n    }\n}\n\n\n.golfer-score {\n    cursor: pointer;;\n}\n.settings {\n    margin: 20px 0;\n}\n.settings .form-control {\n    font-size: 16px;\n}\n.navbar .navbar-brand img {\n    height: 25px;\n}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),
/* 19 */
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

var	fixUrls = __webpack_require__(20);

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
/* 20 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return tourneyTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return leaderboardUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return golferData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contestantData; });
const tourneyTitle = '2017 US Open';

const leaderboardUrl = 'http://www.espn.com/golf/leaderboard?tournamentId=3066';

const golferData = [
    { id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' },
    { id: 2, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' },
    { id: 3, firstName: 'Rory', lastName: 'McIlroy', tier: 'A' },
    { id: 4, firstName: 'Jason', lastName: 'Day', tier: 'A' },
    { id: 5, firstName: 'Jon', lastName: 'Rahm', tier: 'A' },
    { id: 6, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' },
    { id: 7, firstName: 'Justin', lastName: 'Rose', tier: 'A' },
    { id: 8, firstName: 'Sergio', lastName: 'Garcia', tier: 'A' },
    { id: 9, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' },
    { id: 10, firstName: 'Henrik', lastName: 'Stenson', tier: 'A' },

    { id: 11, firstName: 'Adam', lastName: 'Scott', tier: 'B' },
    { id: 12, firstName: 'Justin', lastName: 'Thomas', tier: 'B' },
    { id: 13, firstName: 'Brooks', lastName: 'Koepka', tier: 'B' },
    { id: 14, firstName: 'Branden', lastName: 'Grace', tier: 'B' },
    { id: 15, firstName: 'Thomas', lastName: 'Pieters', tier: 'B' },
    { id: 16, firstName: 'Paul', lastName: 'Casey', tier: 'B' },
    { id: 17, firstName: 'Alex', lastName: 'Noren', tier: 'B' },
    { id: 18, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' },
    { id: 19, firstName: 'Louis', lastName: 'Oosthuizen', tier: 'B' },
    { id: 20, firstName: 'Jason', lastName: 'Dufner', tier: 'B' },
    { id: 21, firstName: 'Matt', lastName: 'Kuchar', tier: 'B' },
    { id: 22, firstName: 'Bubba', lastName: 'Watson', tier: 'B' },
    { id: 23, firstName: 'Daniel', lastName: 'Berger', tier: 'B' },
    { id: 24, firstName: 'Kevin', lastName: 'Chappell', tier: 'B' },
    { id: 25, firstName: 'Kevin', lastName: 'Kisner', tier: 'B' },
    { id: 26, firstName: 'Martin', lastName: 'Kaymer', tier: 'B' },
    { id: 27, firstName: 'Shane', lastName: 'Lowry', tier: 'B' },
    { id: 28, firstName: 'Patrick', lastName: 'Reed', tier: 'B' },
    { id: 29, firstName: 'Billy', lastName: 'Horschel', tier: 'B' },
    { id: 30, firstName: 'Francesco', lastName: 'Molinari', tier: 'B' },
    { id: 31, firstName: 'Marc', lastName: 'Leishman', tier: 'B' },

    { id: 32, firstName: 'Lee', lastName: 'Westwood', tier: 'C' },
    { id: 33, firstName: 'Brandt', lastName: 'Snedeker', tier: 'C' },
    { id: 34, firstName: 'Bud', lastName: 'Cauley', tier: 'C' },
    { id: 35, firstName: 'Byeong Hun', lastName: 'An', tier: 'C' },
    { id: 36, firstName: 'Jimmy', lastName: 'Walker', tier: 'C' },
    { id: 37, firstName: 'Matthew', lastName: 'Fitzpatrick', tier: 'C' },
    { id: 38, firstName: 'Rafael Cabrera', lastName: 'Bello', tier: 'C' },
    { id: 39, firstName: 'Russell', lastName: 'Henley', tier: 'C' },
    { id: 40, firstName: 'Tyrrell', lastName: 'Hatton', tier: 'C' },
    { id: 41, firstName: 'Adam', lastName: 'Hadwin', tier: 'C' },
    { id: 42, firstName: 'Bernd', lastName: 'Wiesberger', tier: 'C' },
    { id: 43, firstName: 'Brendan', lastName: 'Steele', tier: 'C' },
    { id: 44, firstName: 'Emiliano', lastName: 'Grillo', tier: 'C' },
    { id: 45, firstName: 'Gary', lastName: 'Woodland', tier: 'C' },
    { id: 46, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' },
    { id: 47, firstName: 'Si Woo', lastName: 'Kim', tier: 'C' },
    { id: 48, firstName: 'Steve', lastName: 'Stricker', tier: 'C' },
    { id: 49, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'C' },
    { id: 50, firstName: 'Bill', lastName: 'Haas', tier: 'C' },
    { id: 51, firstName: 'Brian', lastName: 'Harman', tier: 'C' },
    { id: 52, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' },
    { id: 53, firstName: 'Graeme', lastName: 'McDowell', tier: 'C' },
    { id: 54, firstName: 'Lucas', lastName: 'Glover', tier: 'C' },
    { id: 55, firstName: 'Ross', lastName: 'Fisher', tier: 'C' },
    { id: 56, firstName: 'Russell', lastName: 'Knox', tier: 'C' },
    { id: 57, firstName: 'Stewart', lastName: 'Cink', tier: 'C' },
    { id: 58, firstName: 'Webb', lastName: 'Simpson', tier: 'C' },
    { id: 59, firstName: 'Zach', lastName: 'Johnson', tier: 'C' },

    { id: 60, firstName: 'Pat', lastName: 'Perez', tier: 'D' },
    { id: 61, firstName: 'Alexander', lastName: 'Levy', tier: 'D' },
    { id: 62, firstName: 'Daniel', lastName: 'Summerhays', tier: 'D' },
    { id: 63, firstName: 'Danny', lastName: 'Willett', tier: 'D' },
    { id: 64, firstName: 'David', lastName: 'Lingmerth', tier: 'D' },
    { id: 65, firstName: 'Hao-tong', lastName: 'Li', tier: 'D' },
    { id: 66, firstName: 'Hideto', lastName: 'Tanihara', tier: 'D' },
    { id: 67, firstName: 'Jhonattan', lastName: 'Vegas', tier: 'D' },
    { id: 68, firstName: 'Keegan', lastName: 'Bradley', tier: 'D' },
    { id: 69, firstName: 'Kevin', lastName: 'Na', tier: 'D' },
    { id: 70, firstName: 'Martin', lastName: 'Laird', tier: 'D' },
    { id: 71, firstName: 'Peter', lastName: 'Uihlein', tier: 'D' },
    { id: 72, firstName: 'Scott', lastName: 'Piercy', tier: 'D' },
    { id: 73, firstName: 'Sean', lastName: 'O\'Hair', tier: 'D' },
    { id: 74, firstName: 'Wesley', lastName: 'Bryan', tier: 'D' },
    { id: 75, firstName: 'William', lastName: 'McGirt', tier: 'D' },
    { id: 76, firstName: 'Andrew', lastName: 'Johnston', tier: 'D' },
    { id: 77, firstName: 'Jamie', lastName: 'Donaldson', tier: 'D' },
    { id: 78, firstName: 'Bryson', lastName: 'DeChambeau', tier: 'D' },
    { id: 79, firstName: 'Cheng Tsung', lastName: 'Pan', tier: 'D' },
    { id: 80, firstName: 'George', lastName: 'Coetzee', tier: 'D' },
    { id: 81, firstName: 'Harris', lastName: 'English', tier: 'D' },
    { id: 82, firstName: 'Jamie', lastName: 'Lovemark', tier: 'D' },
    { id: 83, firstName: 'Jason', lastName: 'Kokrak', tier: 'D' },
    { id: 84, firstName: 'Jeunghun', lastName: 'Wang', tier: 'D' },
    { id: 85, firstName: 'Jim', lastName: 'Furyk', tier: 'D' },
    { id: 86, firstName: 'Paul', lastName: 'Dunne', tier: 'D' },
    { id: 87, firstName: 'Bradley', lastName: 'Dredge', tier: 'D' },
    { id: 88, firstName: 'Brandon', lastName: 'Stone', tier: 'D' },
    { id: 89, firstName: 'Chan', lastName: 'Kim', tier: 'D' },
    { id: 90, firstName: 'Chez', lastName: 'Reavie', tier: 'D' },
    { id: 91, firstName: 'Eddie', lastName: 'Pepperell', tier: 'D' },
    { id: 92, firstName: 'Ernie', lastName: 'Els', tier: 'D' },
    { id: 93, firstName: 'JT', lastName: 'Poston', tier: 'D' },
    { id: 94, firstName: 'Joaquin', lastName: 'Niemann', tier: 'D', isAmateur: true },
    { id: 95, firstName: 'Jordan', lastName: 'Niebrugge', tier: 'D' },
    { id: 96, firstName: 'Maverick', lastName: 'McNealy', tier: 'D', isAmateur: true },
    { id: 97, firstName: 'Richie', lastName: 'Ramsay', tier: 'D' },
    { id: 98, firstName: 'Roberto', lastName: 'Castro', tier: 'D' },
    { id: 99, firstName: 'Ted Potter', lastName: 'Jr.', tier: 'D' },
    { id: 100, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' },
    { id: 101, firstName: 'Aaron', lastName: 'Rai', tier: 'D' },
    { id: 102, firstName: 'Angel', lastName: 'Cabrera', tier: 'D' },
    { id: 103, firstName: 'Jonathan', lastName: 'Randolph', tier: 'D' },
    { id: 104, firstName: 'Meen Whee', lastName: 'Kim', tier: 'D' },
    { id: 105, firstName: 'Kyle', lastName: 'Thompson', tier: 'D' },
    { id: 106, firstName: 'Matt', lastName: 'Wallace', tier: 'D' },
    { id: 107, firstName: 'Satoshi', lastName: 'Kodaira', tier: 'D' },
    { id: 108, firstName: 'Shugo', lastName: 'Imahira', tier: 'D' },
    { id: 109, firstName: 'Thomas', lastName: 'Aiken', tier: 'D' },
    { id: 110, firstName: 'Stephan', lastName: 'Jaeger', tier: 'D' },
    { id: 111, firstName: 'Andres', lastName: 'Romero', tier: 'D' },
    { id: 112, firstName: 'Brad', lastName: 'Dalke', tier: 'D' },
    { id: 113, firstName: 'Brian', lastName: 'Stuard', tier: 'D' },
    { id: 114, firstName: 'Corey', lastName: 'Conners', tier: 'D' },
    { id: 115, firstName: 'Gene', lastName: 'Sauers', tier: 'D' },
    { id: 116, firstName: 'Jack', lastName: 'Maguire', tier: 'D' },
    { id: 117, firstName: 'Michael', lastName: 'Putnam', tier: 'D' },
    { id: 118, firstName: 'Oliver', lastName: 'Bekker', tier: 'D' },
    { id: 119, firstName: 'Sam', lastName: 'Ryder', tier: 'D' },
    { id: 120, firstName: 'Scottie', lastName: 'Scheffler', tier: 'D', isAmateur: true },
    { id: 121, firstName: 'Talor', lastName: 'Gooch', tier: 'D' },
    { id: 122, firstName: 'Wade', lastName: 'Ormsby', tier: 'D' },
    { id: 123, firstName: 'Xander', lastName: 'Schauffele', tier: 'D' },
    { id: 124, firstName: 'Yusaku', lastName: 'Miyazato', tier: 'D' },
    { id: 125, firstName: 'Daniel', lastName: 'Chopra', tier: 'D' },
    { id: 126, firstName: 'Joel', lastName: 'Stalter', tier: 'D' },
    { id: 127, firstName: 'Ben', lastName: 'Kohles', tier: 'D' },
    { id: 128, firstName: 'Brice', lastName: 'Garnett', tier: 'D' },
    { id: 129, firstName: 'Derek', lastName: 'Barron', tier: 'D' },
    { id: 130, firstName: 'John', lastName: 'Oda', tier: 'D' },
    { id: 131, firstName: 'Ryan', lastName: 'Brehm', tier: 'D' },
    { id: 132, firstName: 'Scott', lastName: 'Gregory', tier: 'D', isAmateur: true },
    { id: 133, firstName: 'Stewart', lastName: 'Hagestad', tier: 'D', isAmateur: true },
    { id: 134, firstName: 'Troy', lastName: 'Merritt', tier: 'D' },
    { id: 135, firstName: 'Andy', lastName: 'Pope', tier: 'D' },
    { id: 136, firstName: 'Trey', lastName: 'Mullinax', tier: 'D' },
    { id: 137, firstName: 'Alex', lastName: 'Smalley', tier: 'D', isAmateur: true },
    { id: 138, firstName: 'Chris', lastName: 'Crawford', tier: 'D', isAmateur: true },
    { id: 139, firstName: 'Daniel', lastName: 'Miernicki', tier: 'D' },
    { id: 140, firstName: 'Garrett', lastName: 'Osborn', tier: 'D' },
    { id: 141, firstName: 'Sahith', lastName: 'Theegala', tier: 'D', isAmateur: true },
    { id: 142, firstName: 'Scott', lastName: 'Harvey', tier: 'D', isAmateur: true },
    { id: 143, firstName: 'Matt', lastName: 'Campbell', tier: 'D' },
    { id: 144, firstName: 'Tyson', lastName: 'Alexander', tier: 'D' },
    { id: 145, firstName: 'Walker', lastName: 'Lee', tier: 'D', isAmateur: true },
    { id: 146, firstName: 'Cameron', lastName: 'Champ', tier: 'D', isAmateur: true },
    { id: 147, firstName: 'Kevin', lastName: 'Dougherty', tier: 'D' },
    { id: 148, firstName: 'Mason', lastName: 'Andersen', tier: 'D', isAmateur: true },
    { id: 149, firstName: 'Max', lastName: 'Greyserman', tier: 'D' },
    { id: 150, firstName: 'Nick', lastName: 'Flanagan', tier: 'D' },
    { id: 151, firstName: 'Roman', lastName: 'Robledo', tier: 'D' }
];

const contestantData = [
    { name: 'Adam Weiss', entries: [[1, 11, 39, 95], [2, 15, 43, 95], [6, 13, 34, 73]] },
    { name: 'Cameron Weimer', entries: [[2, 20, 35, 82], [1, 15, 34, 95], [6, 12, 33, 75]] },
    { name: 'Drew Serruto', entries: [[1, 12, 46, 68], [6, 11, 32, 62], [3, 20, 50, 69]] },
    { name: 'Jon Frantz', entries: [[2, 21, 33, 63], [6, 20, 32, 68], [1, 31, 47, 69]] },
    { name: 'Kevin Donoher', entries: [[1, 11, 36, 60], [5, 16, 43, 61], [6, 19, 50, 71]] },
    { name: 'Kyle Bivenour', entries: [[2, 20, 32, 68], [1, 20, 58, 68], [6, 11, 33, 69]] },
    { name: 'Matt Kilianski', entries: [[3, 12, 40, 64], [1, 27, 33, 68], [6, 27, 48, 62]] },
    { name: 'Matt Weimer', entries: [[2, 12, 32, 95], [6, 13, 40, 62], [1, 20, 33, 75]] },
    { name: 'Nate Heckmann', entries: [[4, 27, 50, 75], [6, 12, 47, 69], [2, 14, 33, 69]] },
    { name: 'Neil Thompson', entries: [[1, 13, 46, 71], [2, 12, 34, 71], [3, 17, 34, 71]] },
    { name: 'Ryan Boudouris', entries: [[4, 11, 48, 60], [3, 13, 38, 85], [1, 15, 32, 62]] },
    { name: 'Nick Royer', entries: [[1, 11, 37, 62], [1, 15, 43, 74], [7, 15, 33, 62]] },
    { name: 'Ryan Romes', entries: [[4, 25, 39, 62], [6, 15, 41, 60], [7, 18, 33, 75]] },
    { name: 'Sean Buckle', entries: [[1, 12, 33, 67], [3, 11, 36, 68], [6, 12, 45, 75]] },
    { name: 'Ian Horwich', entries: [[1, 17, 32, 71], [6, 25, 40, 61], [4, 16, 42, 94]] },
    { name: 'David Prevo', entries: [[2, 20, 36, 77], [4, 22, 39, 68], [3, 13, 34, 69]] }
];




/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angulartics__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angulartics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angulartics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angulartics_google_analytics__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angulartics_google_analytics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angulartics_google_analytics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goto_service_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_service_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_service_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__golfers_component_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__footer_component_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__header_component_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pool_component_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__settings_component_js__ = __webpack_require__(12);















__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].service('dataService', __WEBPACK_IMPORTED_MODULE_4__data_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].service('gotoService', __WEBPACK_IMPORTED_MODULE_5__goto_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].service('notificationService', __WEBPACK_IMPORTED_MODULE_6__notification_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].service('settingsService', __WEBPACK_IMPORTED_MODULE_7__settings_service_js__["a" /* default */]);








__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].component('golfers', __WEBPACK_IMPORTED_MODULE_8__golfers_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].component('gpFooter', __WEBPACK_IMPORTED_MODULE_9__footer_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].component('gpHeader', __WEBPACK_IMPORTED_MODULE_10__header_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].component('pool', __WEBPACK_IMPORTED_MODULE_11__pool_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_js__["a" /* default */].component('settings', __WEBPACK_IMPORTED_MODULE_12__settings_component_js__["a" /* default */]);










/***/ })
/******/ ]);
//# sourceMappingURL=golf.js.map