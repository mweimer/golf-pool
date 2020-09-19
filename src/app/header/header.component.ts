import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UpdateService } from '../services/update.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    isOpen = false;
    showAlert: Observable<boolean> = this.updateService.status;
    currentRoute: Observable<string> = this.router.events.pipe(
        filter(event => event instanceof NavigationStart),
        map((event: any) => {
            if (event.url === '/') {
                return 'pool';
            } else if (event.url === '/golfers') {
                return 'golfers';
            } else if (event.url === '/settings') {
                return 'settings';
            } else if (event.url === '/chat') {
                return 'chat';
            }
            return '';
        })
    );

    constructor(private route: ActivatedRoute, private router: Router, private updateService: UpdateService) {}


    toggle() {
        this.isOpen = !this.isOpen;
    }

    closeAlert() {
       this.updateService.clear();
    }
}
