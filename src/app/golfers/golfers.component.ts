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

    private subscription: Subscription;
    private intialized = false;

    constructor(private dataService: DataService, private simplePageScrollService: SimplePageScrollService,
        private gotoService: GotoService, private modalService: NgbModal) {

    }

    ngOnInit(): void {
        this.subscription = this.dataService.get()
        .subscribe((data: PoolData) => {
            this.golferScores = data.golfersScores;  
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
        this.dataService.getPlayerInfo(golferScore).subscribe((playerInfo: PlayerInfo) => {
            const modal = this.modalService.open(InfoModalComponent, { size: 'lg' });
            const infoModalComponent: InfoModalComponent = modal.componentInstance;
            infoModalComponent.info = playerInfo;
        });
    }

    private checkForGotoGolfer() {
        const golferId: number = this.gotoService.gotoGolferId;
        if (golferId > 0) {
            setTimeout(() => this.simplePageScrollService.scrollToElement('#golfer-' + golferId, 0), 10);
            this.dataService.highlightGolfer(golferId);
        }
    }

}
