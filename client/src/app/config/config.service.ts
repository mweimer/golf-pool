import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config, IAppConfig, GolferConfig } from '../models/models';
import { AppConfig } from './app.config';

import config from './config-2017-the-open';

@Injectable()
export class ConfigService {

    allConfigs: IAppConfig[]; 

    private configObservable: ReplaySubject<IAppConfig> = new ReplaySubject<IAppConfig>(1);
    private selectedIndex: number;

    constructor(private http: Http) {
        this.allConfigs = [];

        this.selectedIndex = 0;
        this.init();
    }

    get config(): Observable<IAppConfig> {
        return this.configObservable;
    }

    get selectedConfigIndex(): number {
        return this.selectedIndex;
    }

    setConfig(index: number) {
        this.selectedIndex = index;
        this.configObservable.next(this.allConfigs[this.selectedIndex]);
    }

    private init() {
        this.http.get('/api/golfers')
            .map((res: Response) => {
                const golfers: GolferConfig[] = res.json();
                config.golferData = golfers;
                const appConfig : AppConfig = new AppConfig(config);
                return appConfig;
            })
            .catch(this.handleError)
            .subscribe((appConfig: AppConfig) => {
                 this.configObservable.next(appConfig);
            });
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
