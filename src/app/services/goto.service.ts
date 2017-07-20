import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class GotoService {

    private _gotoGolferId = 0;

    constructor(private router: Router) {}

    get gotoGolferId(): number {
        const id = this._gotoGolferId;
        this._gotoGolferId = 0;
        return id;
    }

    gotoGolfer(id: number) {
        this._gotoGolferId = id;
        this.router.navigateByUrl('/golfers');
    }
}
