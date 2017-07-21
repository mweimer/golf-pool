import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { SimplePageScrollService } from 'ng2-simple-page-scroll';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { InfoModalComponent } from '../info-modal/info-modal.component'
import { PoolData, GolferScore, MovementDirection, PlayerInfo } from '../models/models';

@Component({
    selector: 'app-golfers',
    templateUrl: './golfers.component.html',
    styleUrls: ['./golfers.component.scss']
})

export class GolfersComponent implements OnInit, OnDestroy {

    golferScores: GolferScore[];
    highlightedGolferId: number;
    lastInIndex: number;
    cutline: number;
    cutlineDisplay: string;

    private subscription: Subscription;
    

    constructor(private dataService: DataService, private simplePageScrollService: SimplePageScrollService,
        private gotoService: GotoService, private modalService: NgbModal) {}

    ngOnInit(): void {
        this.subscription = this.dataService.get()
            .subscribe((data: PoolData) => {
                this.golferScores = data.golfersScores;
                this.cutline = data.cutline;
                this.checkCutline();
                this.checkForGotoGolfer();
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
        if (golferScore.score.espnId) {
            this.dataService.getPlayerInfo(golferScore).subscribe((playerInfo: PlayerInfo) => {
                const modal = this.modalService.open(InfoModalComponent, { size: 'lg' });
                const infoModalComponent: InfoModalComponent = modal.componentInstance;
                infoModalComponent.info = playerInfo;
                infoModalComponent.logoImage = golferScore.score.logoImage;
            });
        } else {
            const info: PlayerInfo = new PlayerInfo()
            info.golferId = golferScore.golferConfig.id;
            info.profile = {
                displayName: `${golferScore.golferConfig.firstName} ${golferScore.golferConfig.lastName}`,
            };
            const modal = this.modalService.open(InfoModalComponent, { size: 'lg' });
            const infoModalComponent: InfoModalComponent = modal.componentInstance;
            infoModalComponent.info = info;
        }
    }

    private checkCutline() {
        if (this.cutline) {
            this.cutlineDisplay = this.cutline > 0 ? '+' + this.cutline.toString() : this.cutline.toString();
            this.lastInIndex = this.golferScores.findIndex(gs => gs.score.relativeScore === this.cutline + 1) - 1;
        }
    }

    private checkForGotoGolfer() {
        const golferId: number = this.gotoService.gotoGolferId;
        if (golferId > 0) {
            this.highlightedGolferId = golferId
            setTimeout(() => this.simplePageScrollService.scrollToElement('#golfer-' + golferId, 0), 10);
            setTimeout(() => this.highlightedGolferId = null, 3000);
        }
    }

}
