import { Component, OnInit, OnDestroy  } from '@angular/core';

import { concat } from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { SettingsService } from './settings.service';
import { NotificationService, NotificationStatus } from '../services/notification.service';
import { ConfigService } from '../config/config.service';
import { IAppConfig } from '../models/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {

    contestants: Array<any>;
    selectedContestantId: string;
    notificationStatus: NotificationStatus = new NotificationStatus();
    configs: IAppConfig[];
    selectedConfigIndex: string;

    private statusSubscription: Subscription;
    private settingsSubscription: Subscription;
    private configSubscription: Subscription;

    constructor(private settingsService: SettingsService, private notificationService: NotificationService, 
        private configService: ConfigService) {}

    ngOnInit(): void {
        this.statusSubscription = this.notificationService.getStatus().subscribe((status: NotificationStatus) => {
            this.notificationStatus = status;
        });

        this.settingsSubscription = this.settingsService.getSelectedContestantId().subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId.toString();
        });

        this.configSubscription = this.configService.config.subscribe((config: IAppConfig) => {
            this.contestants = concat([{name: 'none', id: 0}], config.CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
            this.selectedConfigIndex = this.configService.selectedConfigIndex.toString();
        });

        this.configs = this.configService.allConfigs;
    }

    ngOnDestroy() {
        this.statusSubscription.unsubscribe();
        this.settingsSubscription.unsubscribe();
        this.configSubscription.unsubscribe();
    }

    contestantSelected() {
        const value = parseInt(this.selectedContestantId, 10);
        this.settingsService.setSelectedContestantId(value);
    }

    configSelected() {
        const value = parseInt(this.selectedConfigIndex, 10);
        this.configService.setConfig(value);
    }
}
