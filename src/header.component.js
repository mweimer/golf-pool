'use strict';

import logoUrl from './logo.png';

const template = `
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
         <img alt="Golf Pool" ng-src="{{::$ctrl.logoUrl}}">
      </a>
    </div>

    <div class="collapse navbar-collapse" id="navbar-collapse">
      <ul class="nav navbar-nav">
        <li ng-class="{'active': $ctrl.currentRoute() === 'pool'}"><a href="/">Pool</a></li>
        <li ng-class="{'active': $ctrl.currentRoute() === 'golfers'}"><a href="#!/golfers">Golfers</a></li>
        <li ng-class="{'active': $ctrl.currentRoute() === 'settings'}"><a href="#!/settings">Settings</a></li>
      </ul>
    </div>
  </div>
</nav>`;


const controller = ['$location', function($location) {
    this.currentRoute = () => {
        if ($location.path() === '/') {
            return 'pool';
        } else if ($location.path() === '/golfers') {
            return 'golfers';
        } else if ($location.path() === '/settings') {
            return 'settings';
        }

        return '';
    };

    this.$onInit = () => {
        this.logoUrl = logoUrl;
    };
}];

export default { template, controller };