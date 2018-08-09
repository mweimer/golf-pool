import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { Entry, LiveData, GolferScore } from '../models/models';

@Component({
    selector: 'app-pool',
    templateUrl: './pool.component.html',
    styleUrls: ['./pool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolComponent {

    entries: Observable<Entry[]> = this.dataService.liveData.pipe(map((data: LiveData) => data.entries));
    cutline: Observable<{ value: number, type: string }> = this.dataService.liveData.pipe(map((data: LiveData) => data.cutline));

    constructor(private dataService: DataService, 
                private gotoService: GotoService,
                @Inject(LOCALE_ID) private locale: string) {}


    getGolferInfo(entry: Entry, cutline: {value: number, type: string }, index: number): string {
        const golferScore: GolferScore = entry.golferScores[index];
        const thru = golferScore.score.thru ? golferScore.score.thru : formatDate(golferScore.score.startTime, 'shortTime', this.locale);
        const name = golferScore.score.shortName;
        const score = cutline && cutline.type === 'projected' && golferScore.score.relativeScore > cutline.value 
            ? `<span class="text-danger">${golferScore.score.toPar}</span>` : golferScore.score.toPar;
        const info =  golferScore.score.isDNF ?  `${name}: ${score}` : `${name}: ${score} (${thru})`;
        return info;
    }

    gotoGolfer(golferScore: GolferScore) {
        this.gotoService.gotoGolfer(golferScore.golferConfig.id);
    }

    getGolferClass(entry: Entry, golferIndex: number): string {
        if (entry.isDQ) {
            return;
        } else if (entry.golferScores[golferIndex].throwaway) {
            return 'table-warning';
        }

        return 'table-success';
    }
}
