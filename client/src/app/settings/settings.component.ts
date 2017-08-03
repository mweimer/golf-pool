import { Component, OnInit, OnDestroy  } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NotificationService, NotificationStatus } from '../services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {

    notificationStatus: NotificationStatus = new NotificationStatus();

    private statusSubscription: Subscription;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.statusSubscription = this.notificationService.getStatus().subscribe((status: NotificationStatus) => {
            this.notificationStatus = status;
        });
    }

    ngOnDestroy() {
        this.statusSubscription.unsubscribe();
    }
}
