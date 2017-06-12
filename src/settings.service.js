'use strict';

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

export default service;