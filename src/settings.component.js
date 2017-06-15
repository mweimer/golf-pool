'use strict';

const template = `
<form class="settings">
  <div class="form-group">
    <label for="contestantDropdown">Selected Contestant: </label>
    <select id="contestantDropdown" class="form-control" ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">
		<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>
	</select>
  </div>
  <div class="checkbox">
    <label>
      <input disabled type="checkbox" ng-checked="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted"> Enable Notifications
      <span ng-if="$ctrl.notificationStatus.supported && !$ctrl.notificationStatus.granted">(You have not allowed notifications for this domain, please enabled in your browser settings)</span>
      <span ng-if="!$ctrl.notificationStatus.supported">(You browser does not support notifications)</span>
    </label>
  </div>
</form>`;

const controller = function(CONTESTANTS, settingsService, notificationService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
    this.notificationStatus = notificationService.getStatus();
	}
};

export default { template, controller };