'use strict';

const template = `
<div class="pool-leaderboard">
<table class="table table-responsive table-condensed">
	<thead><tr>
		<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>To Par</th>
	</tr></thead>
	<tbody>
		<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ, selected: entry.isSelected}">
			<td ng-bind="entry.position"></td>
			<td ng-bind="entry.name"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[0])" ng-class="entry.golfers[0].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[1])" ng-class="entry.golfers[1].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[2])" ng-class="entry.golfers[2].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>
			<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[3])" ng-class="entry.golfers[3].throwaway ? 'warning' : 'success'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>
			<th ng-bind="entry.overallToPar"></th>
		</tr>
	</tbody>
</table>
</div>`;

const controller = function(dataService, $interval, REFRESH_TIME, $filter, gotoService) {
	const dateFilter = $filter('date');

	const refreshData = () => {
		dataService.get().then(data => {
			this.entries = data.entries;
		});
	};

	let stop;
	this.$onInit = () => {
		refreshData();
		stop = $interval(() => refreshData(), REFRESH_TIME);		
	};

	this.$onDestroy = () => {
		if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
        }
	};

	this.getGolferInfo = (entry, index) => {
		const golfer = entry.golfers[index];
		const info = `${golfer.score.shortName}${golfer.isAmateur ? ' (A)' : ''}: ${golfer.score.toPar} (${golfer.score.thru ? golfer.score.thru : dateFilter(golfer.score.startTime, 'shortTime')})`
		return info;
	};

	this.gotoGolfer = golfer => {
		gotoService.gotoGolfer(golfer.id);
	};
};

export default { template, controller};