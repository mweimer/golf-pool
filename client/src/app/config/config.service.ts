import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config, IAppConfig, User, EntryConfig, ContestantEntriesConfig } from '../models/models';
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

    publishEntry(golferIds: number[][], id: number = 0) {
        if (!this.appConfig || !this.appConfig.TOURNAMENT_ID || !this.user || !this.user.id) {
            return;
        }

        const entry = {
            userId: this.user.id,
            tournamentId: this.appConfig.TOURNAMENT_ID,
            golferIds
        }

        const method = id > 0 ? this.http.put(`/api/entries/${id}`, entry) : this.http.post('/api/entries', entry);

        return method
            .map((res: Response) => {
                const newEntry = res.json();
                return newEntry;   
            })
            .map((newEntry) => {
                const ce: ContestantEntriesConfig = {
                    id: newEntry.id,
                    userName: this.user.name,
                    userId: this.user.id,
                    entries: entry.golferIds
                }
                if (id === 0) {
                    this.appConfig.CONTESTANT_ENTRIES.push(ce); 
                } else {
                    const index = this.appConfig.CONTESTANT_ENTRIES.findIndex(e => e.id == ce.id);
                    this.appConfig.CONTESTANT_ENTRIES[index] = ce;
                }
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
