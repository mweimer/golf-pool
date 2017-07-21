import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import config1 from './config-2017-open-championship';
import config2 from './config-2017-us-open';
import config3 from './config-2017-memorial';
import config4 from './config-2017-masters';


import { Config, IAppConfig } from '../models/models';
import { AppConfig } from './app.config';

@Injectable()
export class ConfigService {

    allConfigs: IAppConfig[]; 

    private configObservable: ReplaySubject<IAppConfig>
    private selectedIndex: number;

    constructor() {
        this.configObservable = new ReplaySubject<IAppConfig>();
        
        const configs = [config1, config2, config3, config4];
        this.allConfigs = configs.map(c => new AppConfig(c))

        this.selectedIndex = 0;
        this.configObservable.next(this.allConfigs[this.selectedIndex]);
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
}
