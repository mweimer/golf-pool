import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppConfig} from '../app.config';
import { GolfData } from '../models/models';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit, OnDestroy {

    refreshTime = `Refresh Time: ${AppConfig.REFRESH_TIME / 1000} seconds`;
    timeStamp: Date;

    private subscription: Subscription;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.subscription = this.dataService.get().subscribe((data: GolfData) => {
            this.timeStamp = data.timeStamp;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
