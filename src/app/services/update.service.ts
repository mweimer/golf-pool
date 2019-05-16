import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable ,  BehaviorSubject , EMPTY } from 'rxjs';
import {catchError} from 'rxjs/operators';

import { IAppConfig } from '../models/models';
import { Constants } from '../config/constants';


@Injectable()
export class UpdateService {

    private _status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        setInterval(() => this.checkForUpdate(), Constants.UPDATE_CHECK_INTERVAL);
    }

    get status(): Observable<boolean> {
        return this._status.asObservable();
    }

    checkForUpdate() {
        const time = (new Date()).getTime();
        const scriptUrl = document.querySelector('script[src*="main"]').getAttribute('src');
        this.http.get(scriptUrl + '?_=' + time)
            .pipe(catchError(err => this.handleError(err)))
            .subscribe();
    }

    clear() {
        this._status.next(false);
    }

    private handleError (error) {
        if (error.status === 404) {
            this._status.next(true);

        }
        return EMPTY;
    }
}
