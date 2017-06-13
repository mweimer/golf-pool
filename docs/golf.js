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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logo_png__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favicon_ico__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__favicon_ico__);




__WEBPACK_IMPORTED_MODULE_0__config__["a" /* contestantData */].forEach((c, i) => c.id = i);




const app = angular.module('golfPool', ['ngSanitize', 'ngRoute'])
	.constant('GOLFERS', __WEBPACK_IMPORTED_MODULE_0__config__["b" /* golferData */])
	.constant('CONTESTANTS', __WEBPACK_IMPORTED_MODULE_0__config__["a" /* contestantData */])
	.constant('REFRESH_TIME', 60000)
	.constant('LEADERBOARD_URL', __WEBPACK_IMPORTED_MODULE_0__config__["c" /* leaderboardUrl */])
	.constant('TOURNEY_TITLE', __WEBPACK_IMPORTED_MODULE_0__config__["d" /* tourneyTitle */])
	.constant('movement', {
		positive: 'positive',
		negative: 'negative',
		none: 'none'
	})
	.config(($routeProvider) => {
		$routeProvider.when('/', { 
			template: '<pool-leaderboard></pool-leaderboard>'
		}).when('/golfers', { 
			template: '<golfer-leaderboard></golfer-leaderboard>'
		}).when('/settings', { 
			template: '<settings></settings>'
		});
	})
	.run(($rootScope, REFRESH_TIME, TOURNEY_TITLE, $location) => {
		$rootScope.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
		$rootScope.tourneyTitle = TOURNEY_TITLE;
		$rootScope.logoUrl = __WEBPACK_IMPORTED_MODULE_1__logo_png___default.a;
		$rootScope.faviconUrl = __WEBPACK_IMPORTED_MODULE_2__favicon_ico___default.a;

		$rootScope.currentRoute = () => {
			if ($location.path() === '/') {
				return 'pool';
			} else if ($location.path() === '/golfers') {
				return 'golfers';
			} else if ($location.path() === '/settings') {
				return 'settings';
			}

			return '';
		};
	});

/* harmony default export */ __webpack_exports__["a"] = (app);	

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const service = function($http, GOLFERS, CONTESTANTS, movement, LEADERBOARD_URL, settingsService) {

	const entries = CONTESTANTS
		.map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
		.reduce((prev, curr) => prev.concat(curr));

	this.getEntries = () => entries;	

	this.get = () => {
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

	let gotoGolferId = null;

	this.setGotoGolferId = (id) => {
		gotoGolferId = id;
	};

	this.getGotoGolferId = () => gotoGolferId;

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
			movement:  { text: '-', direction: movementDirection.none }
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
			movementDirection = movement.positive;
		} else if (movementElement.hasClass('negative')) {
			movementDirection = movement.negative;
		} else {
			movementDirection = movement.none;
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

};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 3 */
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

const controller = function(dataService, $interval, REFRESH_TIME, $anchorScroll, $timeout) {
	const refreshData = () => {
		return dataService.get().then(golfersWithScores => {
			this.golfers = _.sortBy(golfersWithScores, g => g.score.index)
		});
	};

	const scrollHighlightGolfer = () => {
		const golferId = dataService.getGotoGolferId();
		if (golferId) {
			dataService.setGotoGolferId(null);
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
/* 4 */
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

const controller = function(dataService, $interval, REFRESH_TIME, $filter, $location, settingsService) {
	const dateFilter = $filter('date');

	const entries = dataService.getEntries();

	const addDataToEntries = (golfersWithScores) => {
		const entriesWithData = entries.map(entry => {
			const entryGolfers = entry.golferIds.map(gid => angular.copy(golfersWithScores.find(golfer => golfer.id === gid)));
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
				isSelected
			};
		});

		return addPositions(entriesWithData);
	};

	const addPositions = entriesWithData => {
		const sortedEntries = _.sortBy(entriesWithData, ['overallRelativeScore', 'overallTotalScore']);

		let position = 1;
		let lastScore = 0;
		sortedEntries.forEach((entry, index) => {
			const isTied = sortedEntries.filter(e => e.overallRelativeScore === entry.overallRelativeScore).length > 1;
			if (entry.overallRelativeScore > lastScore) {
				position = index + 1;
			} 
 			entry.position = isTied ? 'T' + position : position.toString() ;
 			lastScore = entry.overallRelativeScore;
		})

		return sortedEntries;
	}

	const refreshData = () => {
		dataService.get().then(golfersWithScores => {
			this.entries = addDataToEntries(golfersWithScores);
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
		dataService.setGotoGolferId(golfer.id);
		$location.url('/golfers');
	};
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller});

/***/ }),
/* 5 */
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
</form>`;

const controller = function(CONTESTANTS, settingsService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({ template, controller });

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const service = function(TOURNEY_TITLE) {
	const hasLocalStorage = typeof(Storage) !== 'undefined';
	const key = TOURNEY_TITLE + '-selectedContestantId';

	this.getSelectedContestantId = () => {
		if (!hasLocalStorage || !localStorage.getItem(key)) {
			return -1;
		}

		return parseInt(localStorage.getItem(key));
	};

	this.setSelectedContestantId = value => {
		localStorage.setItem(key, value)
	};

};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "body {\n    font-size: 12px;\n}\n\n.logo {\n    display: inline;\n    margin-right: 5px;\n}\n\n.logo img {\n    bottom: 8px;\n    position: relative;\n    width: 20px;\n    margin-bottom: -14px;\n}\n\ntable th.movement:before {\n    content: \"\\2191\";/*\"\\2B06\";*/\n}\ntable th.movement:after {\n    content: \"\\2193\";\n}\ntable td.negative {\n    color: #d00;\n}\ntable td.negative:before {\n    content: \"\\2193\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable td.positive {\n    color: #094;\n}\ntable td.positive:before {\n    content: \"\\2191\";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable tr.selected {\n    border: 2px solid black;\n}\ntable tr.selected:first-child {\n    border-top-width: 3px;\n}\n\n@media only screen and (max-width: 375px) {\n    .pool-leaderboard table td, .pool-leaderboard table th {\n        max-width: 50px;\n        word-wrap: break-word;\n        font-size: 10px;\n    }\n\n    .golfer-leaderboard table td, .golfer-leaderboard table th {\n        max-width: 40px;\n        word-wrap: break-word;\n        font-size: 8px;\n    }\n}\n\n\n.golfer-score {\n    cursor: pointer;;\n}\n.settings {\n    margin: 20px 0;\n}\n.navbar .navbar-brand img {\n    height: 25px;\n}", ""]);

// exports


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logo.png";

/***/ }),
/* 11 */
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

var	fixUrls = __webpack_require__(12);

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
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return tourneyTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return leaderboardUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return golferData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contestantData; });
const tourneyTitle = '2017 Memorial';

const leaderboardUrl = 'http://www.espn.com/golf/leaderboard?tournamentId=2706';

const golferData = [
    { id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' },
    { id: 2, firstName: 'Jon', lastName: 'Rahm', tier: 'A' },
    { id: 3, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' },
    { id: 4, firstName: 'Jason', lastName: 'Day', tier: 'A' },
    { id: 5, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' },
    { id: 6, firstName: 'Adam', lastName: 'Scott', tier: 'A' },
    { id: 7, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' },
    { id: 8, firstName: 'Matt', lastName: 'Kuchar', tier: 'A' },
    { id: 9, firstName: 'Brooks', lastName: 'Koepka', tier: 'A' },
    { id: 10, firstName: 'Justin', lastName: 'Thomas', tier: 'A' },

    { id: 11, firstName: 'Patrick', lastName: 'Reed', tier: 'B' },
    { id: 12, firstName: 'Tony', lastName: 'Finau', tier: 'B' },
    { id: 13, firstName: 'Kevin', lastName: 'Kisner', tier: 'B' },
    { id: 14, firstName: 'Patrick', lastName: 'Cantlay', tier: 'B' },
    { id: 15, firstName: 'Kevin', lastName: 'Chappell', tier: 'B' },
    { id: 16, firstName: 'Byeong Hun', lastName: 'An', tier: 'B' },
    { id: 17, firstName: 'Emiliano', lastName: 'Grillo', tier: 'B' },
    { id: 18, firstName: 'Phil', lastName: 'Mickelson', tier: 'B' },
    { id: 19, firstName: 'Billy', lastName: 'Horschel', tier: 'B' },
    { id: 20, firstName: 'Bud', lastName: 'Cauley', tier: 'B' },
    { id: 21, firstName: 'Jason', lastName: 'Dufner', tier: 'B' },
    { id: 22, firstName: 'Marc', lastName: 'Leishman', tier: 'B' },
    { id: 23, firstName: 'Webb', lastName: 'Simpson', tier: 'B' },
    { id: 24, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' },
    { id: 25, firstName: 'Bill', lastName: 'Haas', tier: 'B' },
    { id: 26, firstName: 'Brendan', lastName: 'Steele', tier: 'B' },
    { id: 27, firstName: 'Keegan', lastName: 'Bradley', tier: 'B' },
    { id: 28, firstName: 'Kevin', lastName: 'Tway', tier: 'B' },
    { id: 29, firstName: 'Kyle', lastName: 'Stanley', tier: 'B' },
    { id: 30, firstName: 'Shane', lastName: 'Lowry', tier: 'B' },
    { id: 31, firstName: 'Steve', lastName: 'Stricker', tier: 'B' },
    { id: 32, firstName: 'William', lastName: 'McGirt', tier: 'B' },

    { id: 33, firstName: 'Adam', lastName: 'Hadwin', tier: 'C' },
    { id: 34, firstName: 'Danny', lastName: 'Lee', tier: 'C' },
    { id: 35, firstName: 'Gary', lastName: 'Woodland', tier: 'C' },
    { id: 36, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' },
    { id: 37, firstName: 'Pat', lastName: 'Perez', tier: 'C' },
    { id: 38, firstName: 'Rafael', lastName: 'Cabrera Bello', tier: 'C' },
    { id: 39, firstName: 'Ryan', lastName: 'Moore', tier: 'C' },
    { id: 40, firstName: 'Scott', lastName: 'Piercy', tier: 'C' },
    { id: 41, firstName: 'Sean', lastName: 'O\'Hair', tier: 'C' },
    { id: 42, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'C' },
    { id: 43, firstName: 'Brian', lastName: 'Harman', tier: 'C' },
    { id: 44, firstName: 'Bubba', lastName: 'Watson', tier: 'C' },
    { id: 45, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' },
    { id: 46, firstName: 'David', lastName: 'Lingmerth', tier: 'C' },
    { id: 47, firstName: 'Ollie', lastName: 'Schniederjans', tier: 'C' },
    { id: 48, firstName: 'Ross', lastName: 'Fisher', tier: 'C' },
    { id: 49, firstName: 'Graham', lastName: 'Delaet', tier: 'C' },
    { id: 50, firstName: 'Lucas', lastName: 'Glover', tier: 'C' },
    { id: 51, firstName: 'Si Woo', lastName: 'Kim', tier: 'C' },
    { id: 52, firstName: 'Smylie', lastName: 'Kaufman', tier: 'C' },
    { id: 53, firstName: 'Zach', lastName: 'Johnson', tier: 'C' },
    { id: 54, firstName: 'Cameron', lastName: 'Smith', tier: 'C' },
    { id: 55, firstName: 'Chris', lastName: 'Kirk', tier: 'C' },
    { id: 56, firstName: 'Morgan', lastName: 'Hoffmann', tier: 'C' },
    { id: 57, firstName: 'Nick', lastName: 'Taylor', tier: 'C' },
    { id: 58, firstName: 'Peter', lastName: 'Uihlein', tier: 'C' },
    { id: 59, firstName: 'Russell', lastName: 'Knox', tier: 'C' },
    { id: 60, firstName: 'Scott', lastName: 'Brown', tier: 'C' },
    { id: 61, firstName: 'Stewart', lastName: 'Cink', tier: 'C' },
    { id: 62, firstName: 'Sung', lastName: 'Kang', tier: 'C' },
    { id: 63, firstName: 'Jim', lastName: 'Furyk', tier: 'C' },
    { id: 64, firstName: 'Kevin', lastName: 'Streelman', tier: 'C' },
    { id: 65, firstName: 'Soren', lastName: 'Kjeldsen', tier: 'C' },

    { id: 66, firstName: 'Ben', lastName: 'Martin', tier: 'D' },
    { id: 67, firstName: 'Hudson', lastName: 'Swafford', tier: 'D' },
    { id: 68, firstName: 'James', lastName: 'Hahn', tier: 'D' },
    { id: 69, firstName: 'Jamie', lastName: 'Lovemark', tier: 'D' },
    { id: 70, firstName: 'Jason', lastName: 'Kokrak', tier: 'D' },
    { id: 71, firstName: 'Jonas', lastName: 'Blixt', tier: 'D' },
    { id: 72, firstName: 'Martin', lastName: 'Laird', tier: 'D' },
    { id: 73, firstName: 'Patrick', lastName: 'Rodgers', tier: 'D' },
    { id: 74, firstName: 'Vaughn', lastName: 'Taylor', tier: 'D' },
    { id: 75, firstName: 'Aaron', lastName: 'Baddeley', tier: 'D' },
    { id: 76, firstName: 'Billy', lastName: 'Hurley III', tier: 'D' },
    { id: 77, firstName: 'Daniel', lastName: 'Summerhays', tier: 'D' },
    { id: 78, firstName: 'Jim', lastName: 'Herman', tier: 'D' },
    { id: 79, firstName: 'Kelly', lastName: 'Kraft', tier: 'D' },
    { id: 80, firstName: 'Kyle', lastName: 'Reifers', tier: 'D' },
    { id: 81, firstName: 'Luke', lastName: 'Donald', tier: 'D' },
    { id: 82, firstName: 'Luke', lastName: 'List', tier: 'D' },
    { id: 83, firstName: 'Michael', lastName: 'Kim', tier: 'D' },
    { id: 84, firstName: 'Ryan', lastName: 'Ruffels', tier: 'D' },
    { id: 85, firstName: 'J.J.', lastName: 'Spaun', tier: 'D' },
    { id: 86, firstName: 'Brian', lastName: 'Stuard', tier: 'D' },
    { id: 87, firstName: 'David', lastName: 'Hearn', tier: 'D' },
    { id: 88, firstName: 'Harold', lastName: 'Varner, III', tier: 'D' },
    { id: 89, firstName: 'Padraig', lastName: 'Harrington', tier: 'D' },
    { id: 90, firstName: 'Sam', lastName: 'Saunders', tier: 'D' },
    { id: 91, firstName: 'Zac', lastName: 'Blair', tier: 'D' },
    { id: 92, firstName: 'Anirban', lastName: 'Lahiri', tier: 'D' },
    { id: 93, firstName: 'Grayson', lastName: 'Murray', tier: 'D' },
    { id: 94, firstName: 'Mackenzie', lastName: 'Hughes', tier: 'D' },
    { id: 95, firstName: 'Ricky', lastName: 'Barnes', tier: 'D' },
    { id: 96, firstName: 'Vijay', lastName: 'Singh', tier: 'D' },
    { id: 97, firstName: 'Curtis', lastName: 'Luck', tier: 'D' },
    { id: 98, firstName: 'Patton', lastName: 'Kizzire', tier: 'D' },
    { id: 99, firstName: 'Alex', lastName: 'Cejka', tier: 'D' },
    { id: 100, firstName: 'Cheng', lastName: 'Tsung Pan', tier: 'D' },
    { id: 101, firstName: 'D.A.', lastName: 'Points', tier: 'D' },
    { id: 102, firstName: 'Fabian', lastName: 'Gomez', tier: 'D' },
    { id: 103, firstName: 'Hunter', lastName: 'Mahan', tier: 'D' },
    { id: 104, firstName: 'Johnson', lastName: 'Wagner', tier: 'D' },
    { id: 105, firstName: 'K.J.', lastName: 'Choi', tier: 'D' },
    { id: 106, firstName: 'Retief', lastName: 'Goosen', tier: 'D' },
    { id: 107, firstName: 'Roberto', lastName: 'Castro', tier: 'D' },
    { id: 108, firstName: 'Rod', lastName: 'Pampling', tier: 'D' },
    { id: 109, firstName: 'Ryan', lastName: 'Armour', tier: 'D' },
    { id: 110, firstName: 'Ryo', lastName: 'Ishikawa', tier: 'D' },
    { id: 111, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' },
    { id: 112, firstName: 'Brendon', lastName: 'De Jonge', tier: 'D' },
    { id: 113, firstName: 'Brett', lastName: 'Coletta', tier: 'D' },
    { id: 114, firstName: 'Carl', lastName: 'Pettersson', tier: 'D' },
    { id: 115, firstName: 'Greg', lastName: 'Chalmers', tier: 'D' },
    { id: 116, firstName: 'Matthew', lastName: 'Griffin', tier: 'D' },
    { id: 117, firstName: 'Scott', lastName: 'Gregory', tier: 'D' },
    { id: 118, firstName: 'Matt', lastName: 'Every', tier: 'D' },
    { id: 119, firstName: 'Steven', lastName: 'Bowditch', tier: 'D' }
];
const contestantData = [
	{ name: 'Kevin O\'Brien', entries: [[1, 18, 36, 77], [4, 27, 44, 89], [3, 19, 53, 105]] },
	{ name: 'Matt Kilianski', entries: [[1, 18, 44, 71], [1, 26, 53, 73], [4, 15, 36, 77]] },
	{ name: 'Matt Weimer', entries: [[8, 32, 51, 81], [4, 32, 63, 66], [7, 11, 33, 67]] },
	{ name: 'Nate Heckmann', entries: [[1, 12, 35, 77], [2, 16, 33, 80], [8, 12, 33, 67]] },
	{ name: 'Ryan Boudouris', entries: [[8, 13, 35, 67], [1, 12, 39, 87], [4, 12, 37, 107]] }
];




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_service_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__golfer_leaderboard_component_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pool_leaderboard_component_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_component_js__ = __webpack_require__(5);










__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('dataService', __WEBPACK_IMPORTED_MODULE_2__data_service_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].service('settingsService', __WEBPACK_IMPORTED_MODULE_3__settings_service_js__["a" /* default */]);






__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('golferLeaderboard', __WEBPACK_IMPORTED_MODULE_4__golfer_leaderboard_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('poolLeaderboard', __WEBPACK_IMPORTED_MODULE_5__pool_leaderboard_component_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1__app_js__["a" /* default */].component('settings', __WEBPACK_IMPORTED_MODULE_6__settings_component_js__["a" /* default */]);










/***/ })
/******/ ]);
//# sourceMappingURL=golf.js.map