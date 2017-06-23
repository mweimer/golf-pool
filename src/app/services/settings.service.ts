import { Injectable } from '@angular/core';

import { AppConfig } from '../app.config';

@Injectable()
export class SettingsService {

    private hasLocalStorage: boolean = typeof(Storage) !== 'undefined';
    private selectedContestantKey: string = AppConfig.TOURNEY_TITLE + '-selectedContestantId';

    get selectedContestantId(): number {
        if (!this.hasLocalStorage || !localStorage.getItem(this.selectedContestantKey)) {
            return 0;
        }

        return parseInt(localStorage.getItem(this.selectedContestantKey));
    }

    set selectedContestantId(value: number) {
        localStorage.setItem(this.selectedContestantKey, value.toString());
    }

}
