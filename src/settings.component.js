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
      <input type="checkbox" ng-model="$ctrl.enableNotifications" ng-change="$ctrl.enableNotificationsSelected()"> Enable Notifications
    </label>
  </div>
</form>`;

const controller = function(CONTESTANTS, settingsService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

    this.enableNotificationsSelected = () => {
        settingsService.setEnableNotifications(this.enableNotifications);
    };

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
        this.enableNotifications = settingsService.getEnableNotifications();
	}
};

export default { template, controller };