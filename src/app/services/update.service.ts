import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as jQuery from 'jquery';

import { IAppConfig } from '../models/models';
import { Constants } from '../config/constants';


@Injectable()
export class UpdateService {

    private statusObservable: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    constructor() {
        this.statusObservable.next(false);
        
        setInterval(() => this.checkForUpdate(), Constants.UPDATE_CHECK_INTERVAL);
    }

    checkForUpdate() {
        const src = jQuery('script[src*="main"]').attr('src');
        jQuery.ajax({
            type: 'get',
            cache: false,
            url: src
        })
        .fail((err) => this.handleError(err));
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
