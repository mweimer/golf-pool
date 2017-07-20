import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';

@Injectable()
export class SettingsService {

    private hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    private selectedContestantKey: string = AppConfig.TOURNEY_TITLE + '-selectedContestantId';
    private selectedContestantIdObservable: ReplaySubject<number>;

    constructor() {
        this.selectedContestantIdObservable = new ReplaySubject<number>();
        this.init();
    }

    getSelectedContestantId(): Observable<number> {
        return this.selectedContestantIdObservable;
    }

    setSelectedContestantId(value: number) {
        if (this.hasLocalStorage) {
            localStorage.setItem(this.selectedContestantKey, value.toString());
        }
        this.selectedContestantIdObservable.next(value)
    }

    private init() {
        if (!this.hasLocalStorage || !localStorage.getItem(this.selectedContestantKey)) {
            this.selectedContestantIdObservable.next(0);
            return;
        }

        if (this.hasLocalStorage) {
            const value = parseInt(localStorage.getItem(this.selectedContestantKey), 10);
            this.selectedContestantIdObservable.next(value);
        }
    }
}
