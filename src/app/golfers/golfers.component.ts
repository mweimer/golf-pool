import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { SimplePageScrollService } from 'ng2-simple-page-scroll';

import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { GolfData, GolferScore, MovementDirection } from '../models/models';

@Component({
  selector: 'app-golfers',
  templateUrl: './golfers.component.html',
  styleUrls: ['./golfers.component.css']
})

export class GolfersComponent implements OnInit, OnDestroy {

    golferScores: GolferScore[];

    private subscription: Subscription;

    constructor(private dataService: DataService, private simplePageScrollService: SimplePageScrollService,
        private gotoService: GotoService) {

    }

    ngOnInit(): void {
        this.subscription = this.dataService.get().subscribe((data: GolfData) => {
          this.golferScores = data.golfersScores;
          this.scrollHighlightGolfer();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getName (golferScore: GolferScore): string {
        return `${golferScore.golfer.firstName} ${golferScore.golfer.lastName}${golferScore.golfer.isAmateur ? ' (A)' : ''}`;
    }

    getMovementClass(golferScore: GolferScore): string {
        return MovementDirection[golferScore.score.movement.direction].toLowerCase();
    }

    private scrollHighlightGolfer() {
        const golferId: number = this.gotoService.gotoGolferId;
        if (golferId > 0) {
            setTimeout(() => this.simplePageScrollService.scrollToElement('#golfer-' + golferId, 40), 10);
            const golferScore: GolferScore = this.golferScores.find(g => g.golfer.id === golferId);
            if (golferScore) {
                golferScore.isHighlighted = true;
                setTimeout(() => golferScore.isHighlighted = false, 3000);
            }
        }
    }

}
