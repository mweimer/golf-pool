import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SettingsService } from './settings.service'
import { Entry } from '../models/models';

@Injectable()
export class NotificationService {

    private status: NotificationStatus = {
        supported: Boolean('Notification' in window),
        granted: false
    };

    private statusObservable: Observable<NotificationStatus> = new Observable<NotificationStatus>();

    constructor(private settingsService: SettingsService) {
        this.statusObservable = Observable.create((observer: Observer<NotificationStatus>) => {
            observer.next(this.status);

            if (this.status.supported && !this.status.granted) {
                this.requestPermission(observer);
            }
        });

        this.statusObservable.subscribe().unsubscribe();
    }

    private requestPermission(observer: Observer<NotificationStatus>): Promise<boolean> {
        return Notification.requestPermission().then(result => {
            const granted: boolean = result === 'granted';
            this.setGrantedStatus(granted, observer);
            return granted;
        });
    }

    private setGrantedStatus(granted: boolean, observer: Observer<NotificationStatus>) {
        if (this.status.granted !== granted) {
            this.status.granted = granted;
            observer.next(this.status);
        }
    }

    getStatus(): Observable<NotificationStatus> {
        return this.statusObservable;
    }

    update(previousEntries: Entry[], currentEntries: Entry[]) {
        const selectedContestantId: number = this.settingsService.selectedContestantId;
        if (!this.status.supported || !this.status.granted || selectedContestantId <= 0 || !previousEntries) {
            return;
        }

        const previousPositions: number[] = previousEntries.filter(e => e.contestantId === selectedContestantId).map(e => e.positionNumber);
        const currentPositions: number[] = currentEntries.filter(e => e.contestantId === selectedContestantId).map(e => e.positionNumber);

        if (previousPositions.some(p => p === 1 || p === 2) && !currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(false);
        } else if (!previousPositions.some(p => p === 1 || p === 2) && currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(true);
        }
    }

    private showNotification(inTopTwo: boolean) {
        const title = inTopTwo ? 'You\'ve moved into the top 2!' : 'You\'ve dropped out of the top 2.';
        const options = {
            icon: '/assets/logo.png'
        };
        return new Notification(title, options);
    }
}

export class NotificationStatus {
    supported = false;
    granted = false;
}
