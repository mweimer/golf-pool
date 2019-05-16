import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { concat } from 'lodash';
import { Observable } from 'rxjs';
import { take ,  map } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { ConfigService } from '../config/config.service';
import { IAppConfig, NotificationStatus } from '../models/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent implements OnInit {

    contestants: Observable<{name: string, id: number}[]> = this.configService.current
        .pipe(map(config => concat([{name: 'none', id: 0}], config.CONTESTANTS.map(c => ({ name: c.name, id: c.id })))));

    configs: IAppConfig[] = this.configService.allConfigs;

    selectedConfigIndex: string;
    selectedContestantId: string;


    constructor(private settingsService: SettingsService,
                private configService: ConfigService) {}

    ngOnInit() {
        this.settingsService.selectedContestantId.pipe(take(1)).subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId.toString();
        });

        this.configService.selectedIndex.pipe(take(1)).subscribe((selectedIndex: number) => {
            this.selectedConfigIndex = selectedIndex.toString();
        });
    }


    contestantSelected() {
        const value = parseInt(this.selectedContestantId, 10);
        this.settingsService.setSelectedContestantId(value);
    }

    configSelected() {
        const value = parseInt(this.selectedConfigIndex, 10);
        this.configService.setConfig(value);
    }
}
