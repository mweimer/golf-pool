'use strict';

const template = `
<div class="settings">
<span class="lbl">Selected Contestant: </span>
<select ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">
	<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>
</select>
</div>`;

const controller = function(CONTESTANTS, settingsService) {
	this.contestantSelected = () => {
		settingsService.setSelectedContestantId(this.selectedContestantId);
	};

	this.$onInit = () => {
		this.contestants = _.concat([{name: 'none', id: -1}], CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
		this.selectedContestantId = settingsService.getSelectedContestantId().toString();
	}
};

export default { template, controller };