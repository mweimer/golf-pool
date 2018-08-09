import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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

    private configObservable: ReplaySubject<IAppConfig> = new ReplaySubject<IAppConfig>(1);
    private selectedIndex: number;

    constructor() {
        const configs: Config[] = [config9, config8, config7, config6, config5, config4, config3, config2, config1];
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
