import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UpdateService } from '../services/update.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {

    isOpen = false;
    showAlert: Observable<boolean>= this.updateService.status;

    constructor(private router: Router, private updateService: UpdateService) {}

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
       this.updateService.clear();
    }
}
