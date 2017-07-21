import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription'

import { UpdateService } from '../services/update.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isOpen = false;
    showAlert = false;
    private subscription: Subscription;

    constructor(private router: Router, private updateService: UpdateService) {}

    ngOnInit() {
        this.subscription = this.updateService.status.subscribe((status: boolean) => {
            this.showAlert = status;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
}
