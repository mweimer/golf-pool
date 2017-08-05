import { Component, OnInit } from '@angular/core';

import { IAppConfig, User } from '../models/models';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

import { concat } from 'lodash';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

    golferIds = [['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

    private config: IAppConfig;
    private user: User;
    private userEntryId = 0;

    constructor(private configService: ConfigService, private authService: AuthService) { }

    ngOnInit() {
        this.configService.config.subscribe((config: IAppConfig) => {
            this.config = config;
            if (this.user) {
                const userEntry = config.CONTESTANT_ENTRIES.find(e => e.userId === this.user.id);
                if (userEntry) {
                    this.golferIds = userEntry.entries.map(entry => entry.map(id => id.toString()));
                    this.userEntryId = userEntry.id;
                }
            }
        });

        this.authService.user.subscribe((user: User) => {
            this.user = user;
        })
    }

    getGolfers(tier: string) {
        if (this.config) {
            return this.config.GOLFERS.filter(g => g.tier === tier);
        }

        return [];
    }

    submit() {
        const ids = this.golferIds.map(gids => {
            return gids.map(id => {
                const numId = parseInt(id);
                if (isNaN(numId)) {
                    return 0;
                }

                return numId;
            });
        });

        if (ids.every(gids => gids.every(id => id > 0))) {
            this.configService.publishEntry(ids, this.userEntryId);
        }

    }
}
