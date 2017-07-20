import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { SettingsService } from './settings.service'
import { Entry } from '../models/models';

@Injectable()
export class NotificationService {

    private status: NotificationStatus = {
        supported: Boolean('Notification' in window),
        granted: false
    };

    private statusObservable: ReplaySubject<NotificationStatus> = new ReplaySubject<NotificationStatus>();
    private selectedContestantId: number = 0;

    constructor(private settingsService: SettingsService) {
        this.statusObservable.next(this.status);
        if (this.status.supported) {
            this.requestPermission();
        }

        this.settingsService.getSelectedContestantId().subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId;
        });
    }

    getStatus(): Observable<NotificationStatus> {
        return this.statusObservable;
    }

    update(previousEntries: Entry[], currentEntries: Entry[]) {
        if (!this.status.supported || this.selectedContestantId <= 0 || !previousEntries) {
            return;
        }

        const previousPositions: number[] = previousEntries.filter(e => e.contestantId === this.selectedContestantId).map(e => e.positionNumber);
        const currentPositions: number[] = currentEntries.filter(e => e.contestantId === this.selectedContestantId).map(e => e.positionNumber);

        if (previousPositions.some(p => p === 1 || p === 2) && !currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(false);
        } else if (!previousPositions.some(p => p === 1 || p === 2) && currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(true);
        }
    }

    private requestPermission(): Promise<boolean> {
        return Notification.requestPermission().then(result => {
            const granted = result === 'granted';
            this.setGrantedStatus(granted);
            return granted;
        });
    }

    private setGrantedStatus(granted: boolean) {
        if (this.status.granted !== granted) {
            this.status.granted = granted;
            this.statusObservable.next(this.status);
        }
    }

    private showNotification(inTopTwo: boolean) {
        this.requestPermission().then(granted => {
            if (granted) {
                const title = inTopTwo ? 'You\'ve moved into the top 2!' : 'You\'ve dropped out of the top 2.';
                const options = {
                    icon: '/assets/logo.png'
                };
                return new Notification(title, options);
            }
        });
    }
}

export class NotificationStatus {
    supported = false;
    granted = false;
}
