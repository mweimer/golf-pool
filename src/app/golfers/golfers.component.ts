import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { SimplePageScrollService } from 'ng2-simple-page-scroll';

import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { PoolData, GolferScore, MovementDirection, PlayerInfo } from '../models/models';

@Component({
    selector: 'app-golfers',
    templateUrl: './golfers.component.html',
    styleUrls: ['./golfers.component.scss']
})

export class GolfersComponent implements OnInit, OnDestroy {

    golferScores: GolferScore[];
    playerInfo: PlayerInfo;

    private subscription: Subscription;

    constructor(private dataService: DataService, private simplePageScrollService: SimplePageScrollService,
        private gotoService: GotoService) {

    }

    ngOnInit(): void {
        this.subscription = this.dataService.get().subscribe((data: PoolData) => {
            this.golferScores = data.golfersScores;
            this.scrollHighlightGolfer();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getName (golferScore: GolferScore): string {
        return `${golferScore.golferConfig.firstName} ${golferScore.golferConfig.lastName}${golferScore.golferConfig.isAmateur ? ' (A)' : ''}`;
    }

    getMovementClass(golferScore: GolferScore): string {
        return MovementDirection[golferScore.score.movement.direction].toLowerCase();
    }

    showGolferDetail(golferScore: GolferScore) {
        if (this.playerInfo && this.playerInfo.golferId === golferScore.golferConfig.id) {
            this.playerInfo = null;
            return;
        }

        this.dataService.getPlayerInfo(golferScore).subscribe((playerInfo: PlayerInfo) => {
            this.playerInfo = playerInfo;
        });
    }

    private scrollHighlightGolfer() {
        const golferId: number = this.gotoService.gotoGolferId;
        if (golferId > 0) {
            setTimeout(() => this.simplePageScrollService.scrollToElement('#golfer-' + golferId, 0), 10);
            const golferScore: GolferScore = this.golferScores.find(g => g.golferConfig.id === golferId);
            if (golferScore) {
                golferScore.isHighlighted = true;
                setTimeout(() => golferScore.isHighlighted = false, 3000);
            }
        }
    }

}
