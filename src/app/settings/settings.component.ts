import { Component } from '@angular/core';

import { concat } from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { SettingsService } from '../services/settings.service';
import { NotificationService, NotificationStatus } from '../services/notification.service';
import { AppConfig } from '../app.config';


@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {

    contestants: Array<any>;
    selectedContestantId: string;
    notificationStatus: NotificationStatus = new NotificationStatus();
    statusSubscription: Subscription;

    constructor(private settingsService: SettingsService, private notificationService: NotificationService) {

    }

    ngOnInit(): void {
        this.contestants = concat([{name: 'none', id: -1}], AppConfig.CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
        this.selectedContestantId = this.settingsService.selectedContestantId.toString();
        this.statusSubscription = this.notificationService.getStatus().subscribe((status: NotificationStatus) => {
            this.notificationStatus = status;
        });
    }

    ngOnDestroy() {
        this.statusSubscription.unsubscribe();
    }

    contestantSelected() {
        this.settingsService.selectedContestantId = parseInt(this.selectedContestantId);
    }
}
