import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { isUndefined } from 'lodash';
import * as Cookies from 'js-cookie';

import { User } from '../models/models';

@Injectable()
export class AuthService {

    private userObservable: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(private http: Http) {
        this.init();
    }

    get user(): Observable<User> {
        return this.userObservable;
    }

    login(email: string, password: string): Observable<string> {
        return this.http.post('/auth/local', { email, password })
        .map((res: Response) => this.parseToken(res))
        .map((token: string) => this.storeToken(token))
        .map((token: string) => this.parseUser(token))
        .map((user: User) => this.updateUser(user))
        .catch(this.handleError)
    }

    signup(name: string, email: string, password: string) {
        return this.http.post('/api/users', { name, email, password })
        .map((res: Response) => this.parseToken(res))
        .map((token: string) => this.storeToken(token))
        .map((token: string) => this.parseUser(token))
        .map((user: User) => this.updateUser(user))
        .catch(this.handleError);
    }

    logout() {
        Cookies.remove('token')
        this.updateUser();
    }

    private init() {
        const token = Cookies.get('token');
        if (token) {
            const user = this.parseUser(token);
            const now = new Date();
            if (now > user.expirationTime) {
                Cookies.remove('token');
            } else {
                this.updateUser(user);
            }
        }
    }

    private updateUser(user: User = null) {
        this.userObservable.next(user);
        return user;
    }

    private storeToken(token: string): string {
        Cookies.set('token', token);
        return token;
    }

    private parseToken(res: Response): string {
        const token: string = res.json().token;
        return token;
    }

    private parseUser(token: string): User {
        const parts = token.split('.');
        const userString: string = atob(parts[1]);
        const userInfo = JSON.parse(userString);
        const user = new User(userInfo.id, userInfo.name, userInfo.role, userInfo.iat, userInfo.exp);
        return user;
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
