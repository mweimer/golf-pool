'use strict';

import { tourneyTitle, leaderboardUrl, golferData, contestantData } from './config';

contestantData.forEach((c, i) => c.id = i);

import logoUrl from './logo.png';
import faviconUrl from './favicon.ico';

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
	.run(($rootScope, REFRESH_TIME, TOURNEY_TITLE, $location) => {
		$rootScope.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
		$rootScope.tourneyTitle = TOURNEY_TITLE;
		$rootScope.logoUrl = logoUrl;
		$rootScope.faviconUrl = faviconUrl;

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

export default app;	