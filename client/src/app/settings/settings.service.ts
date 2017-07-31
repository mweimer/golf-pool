import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';


import { ConfigService } from '../config/config.service';
import { IAppConfig } from '../models/models';

@Injectable()
export class SettingsService {

    private hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    private selectedContestantEntriesKey: string;
    private selectedContestantEntriesIdObservable: ReplaySubject<number> = new ReplaySubject<number>(1);

    constructor(private configService: ConfigService) {
        this.configService.config.subscribe((config: IAppConfig) => {
            this.selectedContestantEntriesKey = config.TOURNAMENT_ESPNID + '-selectedContestantEntriesId';
            this.init();
        });
    }

    getSelectedContestantEntriesId(): Observable<number> {
        return this.selectedContestantEntriesIdObservable;
    }

    setSelectedContestantEntriesId(value: number) {
        if (this.hasLocalStorage) {
            localStorage.setItem(this.selectedContestantEntriesKey, value.toString());
        }
        this.selectedContestantEntriesIdObservable.next(value)
    }

    private init() {
        if (!this.hasLocalStorage || !localStorage.getItem(this.selectedContestantEntriesKey)) {
            this.selectedContestantEntriesIdObservable.next(0);
            return;
        }

        if (this.hasLocalStorage) {
            const value = parseInt(localStorage.getItem(this.selectedContestantEntriesKey), 10);
            this.selectedContestantEntriesIdObservable.next(value);
        }
    }
}
