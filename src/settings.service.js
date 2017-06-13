'use strict';

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

export default service;