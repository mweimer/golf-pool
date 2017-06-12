'use strict';

import { tourneyTitle, leaderboardUrl, golferData, contestantData } from './data';

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

export default app;	