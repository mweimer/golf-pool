'use strict';

const app = angular.module('golfPool', ['ngSanitize', 'ngRoute'])
	.constant('golfers', golferData)
	.constant('contestants', contestantData)
	.constant('refreshTime', 60000)
	.config(($routeProvider) => {
		$routeProvider.when('/', { 
			template: '<pool-leaderboard></pool-leaderboard>'
		}).when('/golfers', { 
			template: '<golfer-leaderboard></golfer-leaderboard>'
		});
	})
	.run(($rootScope, refreshTime) => {
		$rootScope.refreshTime = `Refresh Time: ${refreshTime / 1000} seconds`;
	});

const poolLeaderboardTemplate = `
<table class="table">
	<thead><tr>
		<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>Total Score</th><th>To Par</th>
	</tr></thead>
	<tbody>
		<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ}">
			<td ng-bind="entry.position"></td>
			<td ng-bind="entry.name"></td>
			<td ng-class="entry.golfers[0].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>
			<td ng-class="entry.golfers[1].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>
			<td ng-class="entry.golfers[2].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>
			<td ng-class="entry.golfers[3].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>
			<td ng-bind="entry.overallTotalScore"></td>
			<th ng-bind="entry.overallToPar"></th>
		</tr>
	</tbody>
</table>`;

const poolLeaderboardController = function(dataService, contestants, $interval, refreshTime) {
	const entries = contestants
		.map(c => c.entries.map((e, i) => ({ name: c.name + ' - Entry ' + (i + 1), golferIds: e})))
		.reduce((prev, curr) => prev.concat(curr));

	const addDataToEntries = (golfersWithScores) => {
		const entriesWithData = entries.map(entry => {
			const entryGolfers = entry.golferIds.map(gid => angular.copy(golfersWithScores.find(golfer => golfer.id === gid)));
			let overallRelativeScore, overallTotalScore, overallToPar;
			const isDQ = entryGolfers.filter(golfer => golfer.score.isDNF).length > 1;

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
				isDQ
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
		stop = $interval(() => refreshData(), refreshTime);		
	};

	this.$onDestroy = () => {
		if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
        }
	};

	this.getGolferInfo = (entry, index) => {
		const golfer = entry.golfers[index];
		const info = `${golfer.score.shortName}${golfer.isAmateur ? ' (A)' : ''}: ${golfer.score.toPar}`
		return info;
	};
};

app.component('poolLeaderboard', {
	template: poolLeaderboardTemplate,
	controller: poolLeaderboardController
});
const golferLeaderboardTemplate = `
<table class="table table-striped">
	<thead><tr>
		<th>Pos</th><th>Player</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>
	</tr></thead>
	<tbody>
		<tr ng-repeat="golfer in $ctrl.golfers track by $index">
			<td ng-bind="golfer.score.position"></td>
			<td><div class="logo"><img ng-src="{{golfer.score.logoImage}}" /></div><span ng-bind="$ctrl.getName(golfer)"></span></td>
			<td ng-bind="golfer.score.toPar"></td>
			<td ng-bind="golfer.score.currentRoundScore"></td>
			<td ng-bind="golfer.score.thru"></td>
			<td ng-bind="golfer.score.round1Score"></td>
			<td ng-bind="golfer.score.round2Score"></td>
			<td ng-bind="golfer.score.round3Score"></td>
			<td ng-bind="golfer.score.round4Score"></td>
			<td ng-bind="golfer.score.total"></td>
		</tr>
	</tbody>
</table>`;

const golferLeaderboardController = function(dataService, $interval, refreshTime) {
	const refreshData = () => {
		dataService.get().then(golfersWithScores => {
			this.golfers = _.sortBy(golfersWithScores, g => g.score.index)
		});
	};

	let stop;
	this.$onInit = () => {
		refreshData();
		stop = $interval(() => refreshData(), refreshTime);		
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


const dataService = function($http, golfers, contestants) {
	this.get = () => {
		return $http({
			method: 'GET',
			url: 'http://www.espn.com/golf/leaderboard?tournamentId=2700'
		}).then(response => {
			const scorePage = $(response.data);
			const golferRows = scorePage.find('.leaderboard-table .player-overview');
			const scores = [];

			golferRows.each(function(index) {
				scores.push(extract($(this), index));
			});

			const golfersWithScores = golfers.map(golfer => {
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
			logoImage: ''
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

		const position = row.find('.position').text();
		const currentRoundScore = row.find('.currentRoundScore').text();
		const thru = row.find('.thru').text();
		const round1Score = row.find('.round1').text();
		const round2Score = row.find('.round2').text();
		const round3Score = row.find('.round3').text();
		const round4Score = row.find('.round4').text();
		const fullName = row.find('.full-name').text();
		const shortName = row.find('.short-name').text();
		const logoImage = row.find('.team-logo img').attr('src');

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
			logoImage
		};
	};

};

app.service('dataService', dataService);