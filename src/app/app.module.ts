import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { GolfersComponent } from './golfers/golfers.component';
import { HeaderComponent } from './header/header.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { PoolComponent } from './pool/pool.component';
import { SettingsComponent } from './settings/settings.component';

import { ConfigService } from './config/config.service';
import { DataService } from './services/data.service';
import { GotoService } from './services/goto.service';
import { SettingsService } from './settings/settings.service';
import { UpdateService } from './services/update.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: '',
                component: PoolComponent
            },
            {
                path: 'golfers',
                component: GolfersComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]),
        HttpClientModule,
        FormsModule,
        Ng2SimplePageScrollModule.forRoot(),
        NgbModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        FooterComponent,
        GolfersComponent,
        HeaderComponent,
        InfoModalComponent,
        PoolComponent,
        SettingsComponent
    ],
    entryComponents: [
        InfoModalComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DataService,
        SettingsService,
        GotoService,
        ConfigService,
        UpdateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
