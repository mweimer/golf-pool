import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import config12 from './config-2019-us-open';
import config11 from './config-2019-pga';
import config10 from './config-2019-masters';
import config9 from './config-2018-pga';
import config8 from './config-2018-the-open';
import config7 from './config-2018-us-open';
import config6 from './config-2018-masters';
import config5 from './config-2017-pga';
import config4 from './config-2017-the-open';
import config3 from './config-2017-us-open';
import config2 from './config-2017-memorial';
import config1 from './config-2017-masters';
import { Config, IAppConfig } from '../models/models';
import { AppConfig } from './app.config';

@Injectable()
export class ConfigService {

    allConfigs: IAppConfig[];

    private _selectedIndex = new BehaviorSubject<number>(0);
    private _current: BehaviorSubject<IAppConfig> = new BehaviorSubject<IAppConfig>(this.initConfig());


    constructor() {}

    get current(): Observable<IAppConfig> {
        return this._current.asObservable();
    }

    get selectedIndex(): Observable<number> {
        return this._selectedIndex.asObservable();
    }

    setConfig(index: number) {
        this._selectedIndex.next(index);
        this._current.next(this.allConfigs[index]);
    }

    private initConfig(): IAppConfig {
        const configs: Config[] = [
            config12,
            config11,
            config10,
            config9,
            config8,
            config7,
            config6,
            config5,
            config4,
            config3,
            config2,
            config1
        ];
        this.allConfigs = configs.map(c => new AppConfig(c));

        return this.allConfigs[this._selectedIndex.getValue()];
    }
}
