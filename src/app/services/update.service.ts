import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as jQuery from 'jquery';

import { ConfigService } from '../config/config.service';
import { IAppConfig } from '../models/models';


@Injectable()
export class UpdateService {

    private statusObservable: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private interval: any;

    constructor(private configService: ConfigService) {
        this.statusObservable.next(false);

        this.configService.config.subscribe((config: IAppConfig) => {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.checkForUpdate();
                }, config.UPDATE_CHECK_INTERVAL);
            }
        });
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
