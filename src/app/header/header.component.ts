import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    isOpen = false;

    constructor(private router: Router) {}

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
}
