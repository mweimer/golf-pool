'use strict';

const template = `
<footer>
  <span ng-bind="::$ctrl.refreshTime">
</footer>`;


const controller = function(REFRESH_TIME) {
    'ngInject';
    
    this.$onInit = () => {
        this.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
    };
};

export default { template, controller };