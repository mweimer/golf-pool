import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { PoolData, IAppConfig } from '../models/models';
import { DataService } from '../services/data.service';
import { ConfigService } from '../config/config.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit, OnDestroy {

    private dataSubscription: Subscription;
    private configSubscription: Subscription;

    refreshTime: string;
    timeStamp: Date;

    constructor(private dataService: DataService, private configService: ConfigService) {}

    ngOnInit(): void {
        this.dataSubscription = this.dataService.get().subscribe((data: PoolData) => {
            this.timeStamp = data.timeStamp;
        });

        this.configSubscription = this.configService.config.subscribe((config: IAppConfig) => {
            this.refreshTime = `Refresh Time: ${config.REFRESH_TIME / 1000} seconds`;
        });
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        this.configSubscription.unsubscribe();
    }
}
