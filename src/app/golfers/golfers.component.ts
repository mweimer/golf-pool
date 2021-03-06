import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SimplePageScrollService } from 'ng2-simple-page-scroll';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { map ,  tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { LiveData, GolferScore, PlayerInfo } from '../models/models';

@Component({
    selector: 'app-golfers',
    templateUrl: './golfers.component.html',
    styleUrls: ['./golfers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GolfersComponent {

    golferScores: Observable<GolferScore[]> = this.dataService.liveData.pipe(
        map((data: LiveData) => data.golfersScores),
        tap(() => {
            const golferId: number = this.gotoService.gotoGolferId;
            if (golferId > 0) {
                this.highlightedGolferId.next(golferId);
                setTimeout(() => this.simplePageScrollService.scrollToElement('#golfer-' + golferId, 0), 10);
                setTimeout(() => this.highlightedGolferId.next(null), 3000);
            }
        })
    );

    lastInIndex: Observable<number> = this.dataService.liveData.pipe(
        map((data: LiveData) => {
            if (data.cutline && data.cutline.type === 'projected') {
                return data.golfersScores.findIndex(gs => gs.score.relativeScore  >= data.cutline.value + 1) - 1;
            }
        }),
    );

    cutlineDisplay: Observable<string> = this.dataService.liveData.pipe(map((data: LiveData) => data.cutline.displayValue));

    highlightedGolferId = new BehaviorSubject<number>(0);

    constructor(private dataService: DataService,
                private simplePageScrollService: SimplePageScrollService,
                private gotoService: GotoService,
                private modalService: NgbModal) {}

    showGolferDetail(golferScore: GolferScore) {
        if (golferScore.score.espnId) {
            this.dataService.getPlayerInfo(golferScore).subscribe((playerInfo: PlayerInfo) => {
                const modal = this.modalService.open(InfoModalComponent, { size: 'lg' });
                const infoModalComponent: InfoModalComponent = modal.componentInstance;
                infoModalComponent.info = playerInfo;
                infoModalComponent.logoImage = golferScore.score.logoImage;
            });
        } else {
            const info: PlayerInfo =  {
                golferId: golferScore.golferConfig.id,
                profile: {
                    displayName: golferScore.golferConfig.name
                }
            };
            const modal = this.modalService.open(InfoModalComponent, { size: 'lg' });
            const infoModalComponent: InfoModalComponent = modal.componentInstance;
            infoModalComponent.info = info;
        }
    }
}
