'use strict';

const service = function($http, GOLFERS, CONTESTANTS, movement, LEADERBOARD_URL, settingsService) {

	const entries = CONTESTANTS
		.map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
		.reduce((prev, curr) => prev.concat(curr));

	this.getEntries = () => entries;	

	this.get = () => {
		return $http({
			method: 'GET',
			url: LEADERBOARD_URL
		}).then(response => {
			const scorePage = $(response.data);
			const golferRows = scorePage.find('.leaderboard-table .player-overview');
			const scores = [];

			golferRows.each(function(index) {
				scores.push(extract($(this), index));
			});

			const golfersWithScores = GOLFERS.map(golfer => {
				const firstName = golfer.firstName.toLowerCase();
				const lastName = golfer.lastName.toLowerCase();
				const score = scores.find(score => {
					const fullName = score.fullName.toLowerCase();
					return fullName.includes(firstName) && fullName.includes(lastName);
				});

				const golferCopy = angular.copy(golfer);
				if (score) {
					golferCopy.score = score;
				} else {
					golferCopy.score = emptyScore(golfer);
				}

				const selectedContestantId = settingsService.getSelectedContestantId();
				golferCopy.entryCount = entries.filter(e => e.golferIds.includes(golferCopy.id)).length;;
				golferCopy.isSelected = entries.some(e => e.golferIds.includes(golferCopy.id) && e.contestantId === selectedContestantId);

				return golferCopy;
			});
			
			return golfersWithScores;
		});
	};

	let gotoGolferId = null;

	this.setGotoGolferId = (id) => {
		gotoGolferId = id;
	};

	this.getGotoGolferId = () => gotoGolferId;

	const emptyScore = (golfer) => {
		return {
			index: Number.MAX_SAFE_INTEGER,
			isDNF: true,
			toPar: '--',
			relativeScore: Number.MAX_SAFE_INTEGER,
			total: '--',
			totalScore: Number.MAX_SAFE_INTEGER,
			position: '--',
			currentRoundScore: '--',
			thru: '--',
			round1Score: '--',
			round2Score: '--',
			round3Score: '--',
			round4Score: '--',
			fullName: '',
			shortName: `${golfer.firstName[0]}. ${golfer.lastName}`,
			logoImage: '',
			startTime: null,
			movement:  { text: '-', direction: movementDirection.none }
		}
	}

	const extract = (row, index) => {
		let isDNF = false;

		const toPar = row.find('.relativeScore').text();
		let relativeScore = toPar === 'E' ? 0 : parseInt(toPar);
		if (isNaN(relativeScore)) {
			relativeScore = Number.MAX_SAFE_INTEGER;
			isDNF = true;
		}

		const total = row.find('.totalScore').text();
		let totalScore = total === '--' ? 0 : parseInt(total);
		if (isNaN(totalScore)) {
			totalScore = Number.MAX_SAFE_INTEGER;
		}

		const thru = row.find('.thru').text();
		let startTime;
		if (thru === '') {
			let time = row.find('.thru .date-container').attr('data-date');
			startTime = new Date(time);
		} else {
			startTime = null;
		}

		const position = row.find('.position').text();
		const currentRoundScore = row.find('.currentRoundScore').text();
		
		const round1Score = row.find('.round1').text();
		const round2Score = row.find('.round2').text();
		const round3Score = row.find('.round3').text();
		const round4Score = row.find('.round4').text();
		const fullName = row.find('.full-name').text();
		const shortName = row.find('.short-name').text();
		const logoImage = row.find('.team-logo img').attr('src');

		const movementElement = row.find('.movement');
		const movementText = movementElement.text();
		let movementDirection;
		if (movementElement.hasClass('positive')) {
			movementDirection = movement.positive;
		} else if (movementElement.hasClass('negative')) {
			movementDirection = movement.negative;
		} else {
			movementDirection = movement.none;
		}

		return {
			index,
			isDNF,
			toPar,
			relativeScore,
			total,
			totalScore,
			position,
			currentRoundScore,
			thru,
			round1Score,
			round2Score,
			round3Score,
			round4Score,
			fullName,
			shortName,
			logoImage,
			startTime,
			movement: {
				text: movementText,
				direction: movementDirection
			}
		};
	};

};

export default service;