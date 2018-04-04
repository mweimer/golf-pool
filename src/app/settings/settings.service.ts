import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { IAppConfig } from '../models/models';

@Injectable()
export class SettingsService {

    private hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    private selectedContestantKey: string;
    private selectedContestantIdObservable: ReplaySubject<number> = new ReplaySubject<number>(1);

    constructor(private configService: ConfigService) {
        this.configService.config.subscribe((config: IAppConfig) => {
            this.selectedContestantKey = config.TOURNEY_ID + '-selectedContestantId';
            this.init();
        });
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
