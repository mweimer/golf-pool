import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { IAppConfig } from '../models/models';

@Injectable()
export class SettingsService {

    private hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    private selectedContestantKey: string;
    private _selectedContestantId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private configService: ConfigService) {
        this.configService.current.subscribe((config: IAppConfig) => {
            this.selectedContestantKey = config.TOURNEY_ID + '-selectedContestantId';
            this.init();
        });
    }

    get selectedContestantId(): Observable<number> {
        return this._selectedContestantId.asObservable();
    }

    setSelectedContestantId(value: number) {
        if (this.hasLocalStorage) {
            localStorage.setItem(this.selectedContestantKey, value.toString());
        }
        this._selectedContestantId.next(value)
    }

    private init() {
        if (!this.hasLocalStorage || !localStorage.getItem(this.selectedContestantKey)) {
            this._selectedContestantId.next(0);
            return;
        }

        if (this.hasLocalStorage) {
            const value = parseInt(localStorage.getItem(this.selectedContestantKey), 10);
            this._selectedContestantId.next(value);
        }
    }
}
