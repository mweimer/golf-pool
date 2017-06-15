'use strict';

import { tourneyTitle, leaderboardUrl, golferData, contestantData } from './config';
import faviconUrl from './favicon.ico';

contestantData.forEach((c, i) => { c.id = i; });

const app = angular.module('golfPool', ['ngSanitize', 'ngRoute', 'angular-google-analytics'])
	.constant('GOLFERS', golferData)
	.constant('CONTESTANTS', contestantData)
	.constant('REFRESH_TIME', 60000)
	.constant('LEADERBOARD_URL', leaderboardUrl)
	.constant('TOURNEY_TITLE', tourneyTitle)
	.constant('MOVEMENT', {
		positive: 'positive',
		negative: 'negative',
		none: 'none'
	})
	.config(($routeProvider, AnalyticsProvider) => {
		$routeProvider.when('/', { 
			template: '<pool></pool>'
		}).when('/golfers', { 
			template: '<golfers></golfers>'
		}).when('/settings', { 
			template: '<settings></settings>'
		});

		AnalyticsProvider.setAccount('UA-8634967-4');
	})
	.run(($rootScope, TOURNEY_TITLE, Analytics) => {
		$rootScope.getTitle = () => $rootScope.positions ? $rootScope.positions + ' - ' + TOURNEY_TITLE + ' Player Pool' : TOURNEY_TITLE + ' Player Pool';
		$rootScope.faviconUrl = faviconUrl;
	});

export default app;	