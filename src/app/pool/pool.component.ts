import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { Entry, LiveData, GolferScore } from '../models/models';
import {merge} from 'lodash';

export interface PoolEntry extends Entry {
    danger: boolean[]
}

@Component({
    selector: 'app-pool',
    templateUrl: './pool.component.html',
    styleUrls: ['./pool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolComponent {

    entries: Observable<PoolEntry[]> = this.dataService.liveData.pipe(
        map((data: LiveData) => {
            const isProjectedCut = data.cutline.type === 'projected';
            return data.entries.map(entry => {
                const danger = entry.golferScores.map(gs => isProjectedCut && gs.score.relativeScore > data.cutline.value)
                return merge(entry, { danger });
            });
        })
    );

    constructor(private dataService: DataService, 
                private gotoService: GotoService) {}


    gotoGolfer(golferScore: GolferScore) {
        this.gotoService.gotoGolfer(golferScore.golferConfig.id);
    }
}
