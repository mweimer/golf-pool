import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { DatePipe, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GolfersComponent } from './golfers/golfers.component';
import { PoolComponent } from './pool/pool.component';
import { SettingsComponent } from './settings/settings.component';

import { DataService } from './services/data.service';
import { SettingsService } from './services/settings.service';
import { GotoService } from './services/goto.service';
import { NotificationService } from './services/notification.service';

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
    HttpModule,
    JsonpModule,
    FormsModule,
    Ng2SimplePageScrollModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PoolComponent,
    GolfersComponent,
    SettingsComponent
  ],
  providers: [
    Location, 
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Title,
    DatePipe,
    DataService,
    SettingsService,
    GotoService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
