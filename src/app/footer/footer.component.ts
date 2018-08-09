import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LiveData, IAppConfig } from '../models/models';
import { DataService } from '../services/data.service';
import { Constants } from '../config/constants';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {

    refreshTime: string = `Refresh Time: ${Constants.REFRESH_TIME / 1000} seconds`;
    timeStamp: Observable<Date> = this.dataService.liveData.pipe(map((data: LiveData) => data.timeStamp));

    constructor(private dataService: DataService) {}

}
