import { Component, OnInit, Input } from '@angular/core';

import { PlayerInfo } from '../models/models';

@Component({
    selector: 'app-player-info',
    templateUrl: './player-info.component.html',
    styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

    player: PlayerInfo;
    selectedRound: number

    cells = ['label', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'out', 10, 11, 12, 13, 14, 15, 16, 17, 18, 'in', 'tot'];

    @Input()
    set info(info: PlayerInfo) {
        this.player = info;

        if (info && info.rounds && info.rounds.length > 0) {
            this.selectedRound = 0;
        } else {
            this.selectedRound = -1;
        }
    }

    constructor() { }

    ngOnInit() {
    }

    getPar(cell: string | number) {
        if (cell === 'label') {
            return 'Par'
        } else if (!this.hasScores()) {
            return '';
        } else if (cell === 'out') {
            return this.player.rounds[this.selectedRound].linescores
            .filter(s => s.period < 10)
            .map(s => s.par)
            .reduce((p, c) => p + c, 0);
        } else if (cell === 'in') {
            return this.player.rounds[this.selectedRound].linescores
            .filter(s => s.period >= 10)
            .map(s => s.par)
            .reduce((p, c) => p + c, 0);
        } else if (cell === 'tot') {
            return this.player.rounds[this.selectedRound].linescores
            .map(s => s.par)
            .reduce((p, c) => p + c, 0);
        }

        const score = this.player.rounds[this.selectedRound].linescores.find(s => s.period === cell);

        return score ? score.par : '';
    }

    getScore(cell: string | number) {
        if (cell === 'label') {
            return 'Score'
        } else if (!this.hasScores()) {
            return '';
        } else if (cell === 'out') {
            return this.player.rounds[this.selectedRound].outScore;
        } else if (cell === 'in') {
            return this.player.rounds[this.selectedRound].inScore;
        } else if (cell === 'tot') {
            return this.player.rounds[this.selectedRound].value;
        }

        const score = this.player.rounds[this.selectedRound].linescores.find(s => s.period === cell);

        return score ? score.value : '';
    }

    getClass(cell: string | number) {
        if (cell === 'label' || cell === 'out' || cell === 'in' || cell === 'tot' || !this.hasScores()) {
            return;
        }

        const score = this.player.rounds[this.selectedRound].linescores.find(s => s.period === cell);

        if (!score) {
            return;
        }

        const diff = score.value - score.par;

        if (diff === -2) {
            return 'yellow';
        } else if (diff === -1) {
            return 'green';
        } else if (diff === 1) {
            return 'red';
        } else if (diff > 1) {
            return 'blue';
        }
    }

    roundSelected(round) {
        this.selectedRound = round.period - 1;
    }

    private hasScores(): boolean {
        return this.selectedRound !== -1 && Boolean(this.player.rounds[this.selectedRound].linescores);
    }

}
