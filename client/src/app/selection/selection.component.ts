import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { IAppConfig, User } from '../models/models';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

import { concat } from 'lodash';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

    golferIds = [['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

    private config: IAppConfig;
    private user: User;
    private userSelectionId = 0;
    private authSubscription: Subscription;
    private configSubscription: Subscription;

    constructor(private configService: ConfigService, private authService: AuthService) { }

    ngOnInit() {
        this.configSubscription = this.configService.config.subscribe((config: IAppConfig) => {
            this.config = config;
            this.init();
        });

        this.authSubscription = this.authService.user.subscribe((user: User) => {
            this.user = user;
            this.init();
        })
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
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
            if (this.userSelectionId > 0) {
                this.configService.updateSelection(ids, this.userSelectionId);
            } else {
                this.configService.createSelection(ids);
            }
        }

    }

    private init() {
        if (this.config && this.user) {
            const userSelection = this.config.SELECTIONS.find(s => s.userId === this.user.id);
            if (userSelection) {
                this.golferIds = userSelection.entries.map(entry => entry.map(id => id.toString()));
                this.userSelectionId = userSelection.id;
            }
        }
    }
}
