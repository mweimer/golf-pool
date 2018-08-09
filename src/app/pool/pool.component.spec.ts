import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PoolComponent } from './pool.component';
import { ConfigService } from '../config/config.service';
import { DataService } from '../services/data.service';
import { GotoService } from '../services/goto.service';
import { SettingsService } from '../settings/settings.service';

describe('Pool Component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterModule.forRoot([]),
            ],
            declarations: [
                PoolComponent
            ],
            providers: [
                ConfigService,
                DataService,
                GotoService,
                SettingsService,
                {provide: APP_BASE_HREF, useValue : '/' }
            ]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(PoolComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});
