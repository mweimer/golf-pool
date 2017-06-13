'use strict';

const service = function($location) {
    let gotoGolferId = null;

    this.gotoGolfer = (id) => {
        gotoGolferId = id;
        $location.url('/golfers');
    };

    this.getGotoGolferId = () => {
        const id = gotoGolferId;
        gotoGolferId = null;
        return id;
    };
};

export default service;