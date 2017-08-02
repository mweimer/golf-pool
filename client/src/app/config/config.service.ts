import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config, IAppConfig } from '../models/models';
import { AppConfig } from './app.config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ConfigService {

    allConfigs: IAppConfig[]; 

    private configObservable: ReplaySubject<IAppConfig> = new ReplaySubject<IAppConfig>(1);
    private selectedIndex: number;
    private token: string;

    constructor(private http: Http, private authService: AuthService) {
        this.selectedIndex = 0;
        this.authService.token.subscribe((token: string) => {
            this.token = token;
        })
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
    }

    private init() {    
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        const options = this.token ? { headers } : {};

        this.http.get('/api/config/4', options)
            .map((res: Response) => {
                const config: Config = res.json();
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
