import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { isUndefined } from 'lodash';
import * as Cookies from 'js-cookie';

@Injectable()
export class AuthService {

    private tokenObservable: ReplaySubject<string> = new ReplaySubject<string>(1);

    constructor(private http: Http) {
        const token = Cookies.get('token');
        if (token) {
            this.tokenObservable.next(token);
        } else {
            this.tokenObservable.next('');
        }
    }

    get token(): Observable<string> {
        return this.tokenObservable;
    }

    login(email: string, password: string): Observable<string> {
        return this.http.post('/auth/local', { email, password })
        .map(this.parseToken)
        .map((token) => this.storeToken(token))
        .catch(this.handleError)
    }

    private storeToken(token: string) {
        Cookies.set('token', token);
        this.tokenObservable.next(token);
    }

    private parseToken(res: Response): string {
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
