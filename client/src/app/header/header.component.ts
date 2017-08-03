import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription'

import { UpdateService } from '../services/update.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isOpen = false;
    showAlert = false;
    user: User;
    private updateSubscription: Subscription;
    private authSubscription: Subscription;

    constructor(private router: Router, private updateService: UpdateService, private authService: AuthService) {}

    ngOnInit() {
        this.updateSubscription = this.updateService.status.subscribe((status: boolean) => {
            this.showAlert = status;
        });

        this.authSubscription = this.authService.user.subscribe((user: User) => {
            this.user = user;
        })
    }

    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    currentRoute(): string {
        if (this.router.url === '/') {
            return 'pool';
        } else if (this.router.url === '/golfers') {
            return 'golfers';
        } else if (this.router.url === '/settings') {
            return 'settings';
        }

        return '';
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    closeAlert() {
        this.showAlert = false;
    }

    logout() {
        this.authService.logout();
    }
}
