import { Component, OnInit, OnDestroy  } from '@angular/core';

import { concat } from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { SettingsService } from '../services/settings.service';
import { NotificationService, NotificationStatus } from '../services/notification.service';
import { AppConfig } from '../app.config';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {

    contestants: Array<any>;
    selectedContestantId: string;
    notificationStatus: NotificationStatus = new NotificationStatus();
    statusSubscription: Subscription;

    constructor(private settingsService: SettingsService, private notificationService: NotificationService) {
        this.settingsService.getSelectedContestantId().subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId.toString();
        });

    }

    ngOnInit(): void {
        this.contestants = concat([{name: 'none', id: 0}], AppConfig.CONTESTANTS.map(c => ({ name: c.name, id: c.id })));
        this.statusSubscription = this.notificationService.getStatus().subscribe((status: NotificationStatus) => {
            this.notificationStatus = status;
        });
    }

    ngOnDestroy() {
        this.statusSubscription.unsubscribe();
    }

    contestantSelected() {
        const value = parseInt(this.selectedContestantId, 10);
        this.settingsService.setSelectedContestantId(value);
    }
}
