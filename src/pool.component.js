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

const controller = function(dataService, $interval, REFRESH_TIME, $filter, settingsService, gotoService) {
	const dateFilter = $filter('date');

	const entries = dataService.getEntries();

	const addDataToEntries = (golfersWithScores) => {
		const entriesWithData = entries.map(entry => {
			const entryGolfers = entry.golferIds.map(gid => angular.copy(golfersWithScores.find(golfer => golfer.id === gid)));
			let overallRelativeScore, overallTotalScore, overallToPar;
			const isDQ = entryGolfers.filter(golfer => golfer.score.isDNF).length > 1;
			const selectedContestantId = settingsService.getSelectedContestantId();
			const isSelected = entry.contestantId === selectedContestantId;

			if (!isDQ) {
				const worstGolfers = _.orderBy(entryGolfers, ['score.relativeScore', 'score.totalScore', 'id'], ['desc', 'desc', 'desc']);
				worstGolfers[0].throwaway = true;

				overallRelativeScore = entryGolfers
					.filter(golfer => golfer.throwaway !== true)
					.reduce((prev, curr) => prev + curr.score.relativeScore, 0);

				overallTotalScore = entryGolfers
					.filter(golfer => golfer.throwaway !== true)
					.reduce((prev, curr) => prev + curr.score.totalScore, 0).toString();

				overallToPar = overallRelativeScore === 0 ? 'E' : overallRelativeScore.toString();
			} else {
				overallRelativeScore = Number.MAX_SAFE_INTEGER;
				overallTotalScore = '--';
				overallToPar = '--';
			}
			
			return {
				name: entry.name,
				golfers: entryGolfers,
				overallRelativeScore,
				overallTotalScore,
				overallToPar,
				isDQ,
				isSelected
			};
		});

		return addPositions(entriesWithData);
	};

	const addPositions = entriesWithData => {
		const sortedEntries = _.sortBy(entriesWithData, ['overallRelativeScore', 'overallTotalScore']);

		let position = 1;
		let lastScore = 0;
		sortedEntries.forEach((entry, index) => {
			const isTied = sortedEntries.filter(e => e.overallRelativeScore === entry.overallRelativeScore).length > 1;
			if (entry.overallRelativeScore > lastScore) {
				position = index + 1;
			} 
 			entry.position = isTied ? 'T' + position : position.toString() ;
 			lastScore = entry.overallRelativeScore;
		})

		return sortedEntries;
	}

	const refreshData = () => {
		dataService.get().then(golfersWithScores => {
			this.entries = addDataToEntries(golfersWithScores);
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