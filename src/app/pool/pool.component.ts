import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription'

import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { Entry, GolfData, GolferScore } from '../models/models';

@Component({
    selector: 'app-pool',
    templateUrl: './pool.component.html',
    styleUrls: ['./pool.component.scss']
})

export class PoolComponent implements OnInit, OnDestroy {

    entries: Entry[];

    private subscription: Subscription;

    constructor(private dataService: DataService, private datePipe: DatePipe, private gotoService: GotoService) {

    }

    ngOnInit(): void {
        this.subscription = this.dataService.get().subscribe((data: GolfData) => {
            this.entries = data.entries;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getGolferInfo(entry: Entry, index: number): string {
        const golferScore: GolferScore = entry.golferScores[index];
        const thru = golferScore.score.thru ? golferScore.score.thru : this.datePipe.transform(golferScore.score.startTime, 'shortTime');
        const name = golferScore.score.shortName + (golferScore.golfer.isAmateur ? ' (A)' : '');
        const info = `${name}: ${golferScore.score.toPar} (${thru})`;
        return info;
    }

    gotoGolfer(golferScore: GolferScore) {
        this.gotoService.gotoGolfer(golferScore.golfer.id);
    }

    getGolferClass(entry: Entry, golferIndex: number) {
        if (entry.isDQ) {
            return;
        } else if (entry.golferScores[golferIndex].throwaway) {
            return 'table-warning';
        }

        return 'table-success';
    }
}
