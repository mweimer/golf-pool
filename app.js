'use strict';

const app = angular.module('golfPool', []);

const homeTemplate = `
<ul>
	<li ng-repeat="golfer in $ctrl.golfers track by golfer.id" ng-bind="$ctrl.getGolferText(golfer)"></li>
</ul>`;

const homeController = function(scoreService) {
	this.golfers = golfers;

	this.getGolferText = g => {
		if (g.score) {
			return `${g.firstName} ${g.lastName}: ${g.score.position} - ${g.score.totalScore}`;
		} else {
			return `${g.firstName} ${g.lastName}`;
		}
	}

	scoreService.getScores();
};

app.component('home', {
	template: homeTemplate,
	controller: homeController
});

const scoreService = function($http) {
	this.getScores = () => {
		$http({
			method: 'GET',
			url: 'http://www.espn.com/golf/leaderboard?tournamentId=2493'
		}).then(response => {
			const scorePage = $(response.data);
			const playerRows = scorePage.find('table.leaderboard-table .player-overview');
			const scores = [];
			playerRows.each(function(index) {
				scores.push(extract($(this)));
			});

			golfers.forEach(g => {
				const firstName = g.firstName.toLowerCase();
				const lastName = g.lastName.toLowerCase();
				const score = scores.find(s => {
					const fullName = s.fullName.toLowerCase()
					return fullName.includes(firstName) && fullName.includes(lastName);
				});

				g.score = score;
			});

			return golfers;
		});
	};

	const extract = row => {
		const positionText = row.find('.position').text()
		const position = positionText === '-' ? 'DNF' : positionText;
		const tied = row.find('.position').text().startsWith('T');
		const fullName =  row.find('.full-name').text();
		const shortName =  row.find('.short-name').text();
		const relativeScore = row.find('.relativeScore').text();
		const currentRoundScore = row.find('.currentRoundScore').text();
		const thru = row.find('.thru').text();
		const round1Score = parseInt(row.find('.round1').text());
		const round2Score = parseInt(row.find('.round2').text());
		const round3Score = parseInt(row.find('.round3').text());
		const round4Score = parseInt(row.find('.round4').text());
		const totalScore = parseInt(row.find('.totalScore').text());

		return {
			position,
			fullName,
			shortName,
			relativeScore,
			currentRoundScore,
			thru,
			round1Score,
			round2Score,
			round3Score,
			round4Score,
			totalScore
		};
	};

};

app.service('scoreService', scoreService);