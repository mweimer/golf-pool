import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    height: string;

    constructor() {}

    ngOnInit() {
        this.setHeight();
    }

    @HostListener('window:resize')
    private setHeight() {
        this.height = (window.innerHeight - 180) + 'px';
    }
}
