'use strict';

import logoUrl from './logo.png';

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
					icon: logoUrl
				};
				const notification = new Notification(title, options);
			} else {
				status.granted = false;
			}
		});
	};
};

export default service;