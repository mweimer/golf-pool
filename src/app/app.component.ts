import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UpdateService } from './services/update.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

    constructor(private updateService : UpdateService) {
        this.updateService.checkForUpdate();
    }

}
