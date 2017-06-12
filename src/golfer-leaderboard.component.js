'use strict';

const template = `
<table class="table table-striped">
	<thead>
	<tr>
		<th>Pos</th><th class="movement"></th><th>Player</th><th>Entries</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>
	</tr>
	</thead>
	<tbody>
		<tr ng-repeat="golfer in $ctrl.golfers track by $index" ng-attr-id="golfer-{{golfer.id}}" ng-class="{'success': golfer.isHighlighted, 'selected': golfer.isSelected}">
			<td ng-bind="golfer.score.position"></td>
			<td ng-class="golfer.score.movement.direction" ng-bind="golfer.score.movement.text"></td>
			<td><div ng-if="golfer.score.logoImage" class="logo"><img ng-src="{{golfer.score.logoImage}}" /></div><span ng-bind="$ctrl.getName(golfer)"></span></td>
			<td ng-bind="golfer.entryCount"></td>
			<td ng-bind="golfer.score.toPar"></td>
			<td ng-bind="golfer.score.currentRoundScore"></td>
			<td ng-if="golfer.score.thru" ng-bind="golfer.score.thru"></td>
			<td ng-if="!golfer.score.thru" ng-bind="golfer.score.startTime | date:'shortTime'"></td>
			<td ng-bind="golfer.score.round1Score"></td>
			<td ng-bind="golfer.score.round2Score"></td>
			<td ng-bind="golfer.score.round3Score"></td>
			<td ng-bind="golfer.score.round4Score"></td>
			<td ng-bind="golfer.score.total"></td>
		</tr>
	</tbody>
</table>`;

const controller = function(dataService, $interval, REFRESH_TIME, $anchorScroll, $timeout) {
	const refreshData = () => {
		return dataService.get().then(golfersWithScores => {
			this.golfers = _.sortBy(golfersWithScores, g => g.score.index)
		});
	};

	const scrollHighlightGolfer = () => {
		const golferId = dataService.getGotoGolferId();
		if (golferId) {
			dataService.setGotoGolferId(null);
			$timeout(() => $anchorScroll('golfer-' + golferId), 10);
			const golfer = this.golfers.find(g => g.id === golferId);
			if (golfer) {
				golfer.isHighlighted = true;
				$timeout(() => golfer.isHighlighted = false, 3000);
			}
		}
	}

	let stop;
	this.$onInit = () => {
		refreshData().then(() => scrollHighlightGolfer());
		stop = $interval(() => refreshData(), REFRESH_TIME);		
	};

	this.$onDestroy = () => {
		if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
        }
	};

	this.getName = golfer => {
		return `${golfer.firstName} ${golfer.lastName}${golfer.isAmateur ? ' (A)' : ''}`;
	};
};

export default { template, controller };