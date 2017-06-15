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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logo.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon_ico__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__favicon_ico__);





__WEBPACK_IMPORTED_MODULE_0__config__["a" /* contestantData */].forEach((c, i) => c.id = i);

const app = angular.module('golfPool', ['ngSanitize', 'ngRoute'])
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
      <input disabled type="checkbox" ng-checked="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted"> Enable Notifications
      <span ng-if="$ctrl.notificationStatus.supported && !$ctrl.notificationStatus.granted">(You have not allowed notifications for this domain, please enabled in your browser settings)</span>
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "body {\n    font-size: 12px;\n}\n\n.logo {\n    display: inline;\n    margin-right: 5px;\n}\n\n.logo img {\n    bottom: 8px;\n    position: relative;\n    width: 20px;\n    margin-bottom: -14px;\n}\n\ntable th.movement:before {\n    content: \"\\2191\";/*\"\\2B06\";*/\n}\ntable th.movement:after {\n    content: \"\\2193\";\n}\ntable td.negative {\n    color: #d00;\n}\ntable td.negative:before {\n    content: \"\\2193\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable td.positive {\n    color: #094;\n}\ntable td.positive:before {\n    content: \"\\2191\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable tr.selected {\n    border: 2px solid black;\n}\ntable tr.selected:first-child {\n    border-top-width: 3px;\n}\n\n@media only screen and (max-width: 375px) {\n    .pool-leaderboard table td, .pool-leaderboard table th {\n        max-width: 50px;\n        word-wrap: break-word;\n        font-size: 10px;\n    }\n\n    .golfer-leaderboard table td, .golfer-leaderboard table th {\n        max-width: 40px;\n        word-wrap: break-word;\n        font-size: 8px;\n    }\n}\n\n\n.golfer-score {\n    cursor: pointer;;\n}\n.settings {\n    margin: 20px 0;\n}\n.settings .form-control {\n    font-size: 16px;\n}\n.navbar .navbar-brand img {\n    height: 25px;\n}", ""]);

// exports


/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),
/* 15 */
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

var	fixUrls = __webpack_require__(16);

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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__goto_service_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notification_service_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_service_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__golfers_component_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__footer_component_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_component_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pool_component_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_component_js__ = __webpack_require__(10);












__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('dataService', __WEBPACK_IMPORTED_MODULE_2__data_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('gotoService', __WEBPACK_IMPORTED_MODULE_3__goto_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('notificationService', __WEBPACK_IMPORTED_MODULE_4__notification_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('settingsService', __WEBPACK_IMPORTED_MODULE_5__settings_service_js__["a" /* default */]);








__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('golfers', __WEBPACK_IMPORTED_MODULE_6__golfers_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('gpFooter', __WEBPACK_IMPORTED_MODULE_7__footer_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('gpHeader', __WEBPACK_IMPORTED_MODULE_8__header_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('pool', __WEBPACK_IMPORTED_MODULE_9__pool_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('settings', __WEBPACK_IMPORTED_MODULE_10__settings_component_js__["a" /* default */]);










/***/ })
/******/ ]);
//# sourceMappingURL=golf.js.map