'use strict';

const service = ['TOURNEY_TITLE', function(TOURNEY_TITLE) {
    const hasLocalStorage = typeof(Storage) !== 'undefined';
    const selectedContestantKey = TOURNEY_TITLE + '-selectedContestantId';

    this.getSelectedContestantId = () => {
        if (!hasLocalStorage || !localStorage.getItem(selectedContestantKey)) {
            return -1;
        }

        return parseInt(localStorage.getItem(selectedContestantKey));
    };

    this.setSelectedContestantId = value => {
        localStorage.setItem(selectedContestantKey, value);
    };
}];

export default service;