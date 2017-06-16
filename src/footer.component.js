'use strict';

const template = `
<footer>
  <span ng-bind="::$ctrl.refreshTime">
</footer>`;


const controller = ['REFRESH_TIME', function(REFRESH_TIME) {
    this.$onInit = () => {
        this.refreshTime = `Refresh Time: ${REFRESH_TIME / 1000} seconds`;
    };
}];

export default { template, controller };