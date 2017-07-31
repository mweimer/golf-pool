import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    login(email: string, password: string): Observable<string> {
        return this.http.post('/auth/local', { email, password })
        .map(this.getToken)
        .map(this.storeToken)
        .catch(this.handleError)
    }

    private storeToken(token: string) {
        document.cookie = `token=${token}`;
    }

    private getToken(res: Response): string {
        const token: string = res.json().token;
        return token;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
   
}
