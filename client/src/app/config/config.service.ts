import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config, IAppConfig, User, EntryConfig, Selection } from '../models/models';
import { AppConfig } from './app.config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ConfigService {

    private configObservable: ReplaySubject<IAppConfig> = new ReplaySubject<IAppConfig>(1);
    private appConfig: AppConfig;
    private user: User;

    constructor(private http: Http, private authService: AuthService) {
        this.init();
    }

    get config(): Observable<IAppConfig> {
        return this.configObservable;
    }

    createSelection(entries: number[][]) {
        if (!this.appConfig || !this.user) {
            return;
        }

        const entry = {
            userId: this.user.id,
            tournamentId: this.appConfig.TOURNAMENT_ID,
            entries
        }

        this.http.post('/api/selections', entry)
            .map((res: Response) => {
                const newSelection = res.json();
                newSelection.userName = this.user.name;
                return newSelection;   
            })
            .map((newSelection) => {
                this.appConfig.SELECTIONS.push(newSelection);
                this.configObservable.next(this.appConfig);
            })
            .catch(this.handleError)
            .subscribe(res => { console.log(res) });
    }

    updateSelection(entries: number[][], id: number) {
         if (!this.appConfig || !this.user) {
            return;
        }

        const entry = {
            id,
            userId: this.user.id,
            tournamentId: this.appConfig.TOURNAMENT_ID,
            entries
        }

        this.http.put(`/api/selections/${id}`, entry)
            .map((res: Response) => {
                return res.text();
            })
            .map((count) => {
                const index = this.appConfig.SELECTIONS.findIndex(s => s.id == id);
                this.appConfig.SELECTIONS[index].entries = entries;
                this.configObservable.next(this.appConfig);
            })
            .catch(this.handleError)
            .subscribe(res => { console.log(res) });            
    }

    private init() {    
        this.authService.user.subscribe((user: User) => {
            this.user = user;
        });

        this.http.get('/api/config/current')
            .map((res: Response) => {
                const config: Config = res.json();
                const appConfig : AppConfig = new AppConfig(config);
                return appConfig;
            })
            .catch(this.handleError)
            .subscribe((appConfig: AppConfig) => {
                this.appConfig = appConfig;
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
