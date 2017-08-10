import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { DatePipe, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GolfersComponent } from './golfers/golfers.component';
import { PoolComponent } from './pool/pool.component';
import { SettingsComponent } from './settings/settings.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { DataService } from './services/data.service';
import { GotoService } from './services/goto.service';
import { NotificationService } from './services/notification.service';
import { ConfigService } from './config/config.service';
import { UpdateService } from './services/update.service';
import { AuthService } from './auth/auth.service';
import { SelectionComponent } from './selection/selection.component';
import { TournamentComponent } from './tournament/tournament.component';
import { HomeComponent } from './home/home.component';
import { TournamentService } from './tournament/tournament.service'

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'pool',
                component: PoolComponent
            },
            {
                path: 'golfers',
                component: GolfersComponent
            },
            {
                path: 'selection',
                component: SelectionComponent
            },
            {
                path: 'tournament',
                component: TournamentComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]),
        HttpModule,
        JsonpModule,
        FormsModule,
        Ng2SimplePageScrollModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PoolComponent,
        GolfersComponent,
        SettingsComponent,
        InfoModalComponent,
        LoginComponent,
        SignupComponent,
        SelectionComponent,
        TournamentComponent,
        HomeComponent
    ],
    entryComponents: [
        InfoModalComponent
    ],
    providers: [
        Location,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        Title,
        DatePipe,
        DataService,
        GotoService,
        NotificationService,
        ConfigService,
        UpdateService,
        AuthService,
        TournamentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
