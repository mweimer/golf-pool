import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../auth/auth.service'
import { Entry, User } from '../models/models';

@Injectable()
export class NotificationService {

    private status: NotificationStatus = {
        supported: Boolean('Notification' in window),
        granted: false
    };

    private statusObservable: ReplaySubject<NotificationStatus> = new ReplaySubject<NotificationStatus>(1);
    private user: User;

    constructor(private authService: AuthService) {
        this.statusObservable.next(this.status);
        if (this.status.supported) {
            this.requestPermission();
        }

        this.authService.user.subscribe(user => {
            this.user = user;
        });
    }

    getStatus(): Observable<NotificationStatus> {
        return this.statusObservable;
    }

    update(previousEntries: Entry[], currentEntries: Entry[]) {
        if (!this.status.supported || !this.user || !previousEntries) {
            return;
        }

        const previousPositions: number[] = previousEntries.filter(e => e.userId === this.user.id).map(e => e.positionNumber);
        const currentPositions: number[] = currentEntries.filter(e => e.userId === this.user.id).map(e => e.positionNumber);

        if (previousPositions.some(p => p === 1 || p === 2) && !currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(false);
        } else if (!previousPositions.some(p => p === 1 || p === 2) && currentPositions.some(p => p === 1 || p === 2)) {
            this.showNotification(true);
        }
    }

    private requestPermission(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Notification.requestPermission(result => {
                const granted = result === 'granted';
                this.setGrantedStatus(granted);
                resolve(granted);
            });
        })
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
