import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';

import { IAppConfig } from '../models/models';
import { Constants } from '../config/constants';


@Injectable()
export class UpdateService {

    private statusObservable: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    constructor(private http: Http) {
        this.statusObservable.next(false);
        
        setInterval(() => this.checkForUpdate(), Constants.UPDATE_CHECK_INTERVAL);
    }

    checkForUpdate() {
        const time = (new Date()).getTime();
        const scriptUrl = document.querySelector('script[src*="main"]').getAttribute('src');
        this.http.get(scriptUrl + '?_=' + time)
            .toPromise()
            .catch(err  => this.handleError(err));
    }

    get status(): ReplaySubject<boolean> {
        return this.statusObservable;
    }

    private handleError (error: Response) {
        if (error.status === 404) {
            this.statusObservable.next(true);
        }
    }
}
