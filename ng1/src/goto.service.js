'use strict';

const service = function($location) {
    'ngInject';
    
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