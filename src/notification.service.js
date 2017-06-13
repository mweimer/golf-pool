'use strict';

import logoUrl from './logo.png';

const service = function(settingsService) {
	const hasNotifications = Boolean('Notification' in window);

	if (hasNotifications) {
		Notification.requestPermission();
	}



	this.update = (previousEntries, currentEntries) => {
		const selectedContestantId = settingsService.getSelectedContestantId();
		if (!hasNotifications || selectedContestantId < 0 || !previousEntries) {
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
				const title = inTopTwo ? 'You\'ve moved into the top 2!' : 'You\'ve dropped out of the top 2.';
				const options = { 
					vibrate: [200, 100, 200],
					icon: logoUrl
				};
				const notification = new Notification(title, options);
			}
		});
	};
};

export default service;