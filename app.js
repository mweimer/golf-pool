'use strict';

contestantData.forEach((c, i) => c.id = i);

const app = angular.module('golfPool', ['ngSanitize', 'ngRoute'])
	.constant('GOLFERS', golferData)
	.constant('CONTESTANTS', contestantData)
	.constant('REFRESH_TIME', 60000)
	.constant('LEADERBOARD_URL', leaderboardUrl)
	.constant('TOURNEY_TITLE', tourneyTitle)
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
	.run(($rootScope, REFRESH_TIME, TOURNEY_TITLE) => {
		$rootScope.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
		$rootScope.tourneyTitle = TOURNEY_TITLE;
	});

const poolLeaderboardTemplate = `
<table class="table">
	<thead><tr>
		<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>Total Score</th><th>To Par</th>
	</tr></thead>
	<tbody>
		<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ, selected: entry.isSelected}">
			<td ng-bind="entry.position"></td>
			<td ng-bind="entry.name"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[0])" ng-class="entry.golfers[0].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[1])" ng-class="entry.golfers[1].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[2])" ng-class="entry.golfers[2].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[3])" ng-class="entry.golfers[3].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>
			<td ng-bind="entry.overallTotalScore"></td>
			<th ng-bind="entry.overallToPar"></th>
		</tr>
	</tbody>
</table>`;

const poolLeaderboardController = function(dataService, $interval, REFRESH_TIME, $filter, $location, settingsService) {
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

app.component('poolLeaderboard', {
	template: poolLeaderboardTemplate,
	controller: poolLeaderboardController
});
const golferLeaderboardTemplate = `
<table class="table table-striped">
	<thead>
	<tr>
		<th>Pos</th><th class="movement"></th><th>Player</th><th>Entries</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>
	</tr>
	</thead>
	<tbody>
		<tr ng-repeat="golfer in $ctrl.golfers track by $index" ng-attr-id="golfer-{{golfer.id}}" ng-class="{'success': golfer.isHighlighted}">
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
</table>`;

const golferLeaderboardController = function(dataService, $interval, REFRESH_TIME, $anchorScroll, $timeout) {
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

app.component('golferLeaderboard', {
	template: golferLeaderboardTemplate,
	controller: golferLeaderboardController
});



const settingsTemplate = `
<div class="settings">
<select ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">
	<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>
</select>
</div>`;

const settingsController = function(CONTESTANTS, settingsService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
	}
};

app.component('settings', {
	template: settingsTemplate,
	controller: settingsController
});


const settingsService = function(TOURNEY_TITLE) {
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

app.service('settingsService', settingsService);

const dataService = function($http, GOLFERS, CONTESTANTS, movement, LEADERBOARD_URL) {

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

				const entryCount = entries.filter(e => e.golferIds.includes(golferCopy.id)).length;
				golferCopy.entryCount = entryCount;

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

app.service('dataService', dataService);