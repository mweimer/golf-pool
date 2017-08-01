import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { isUndefined } from 'lodash';

@Injectable()
export class AuthService {

    constructor(private http: Http) {}

    login(email: string, password: string): Observable<string> {
        return this.http.post('/auth/local', { email, password })
        .map(this.getToken)
        .map((token) => this.storeToken(token))
        .catch(this.handleError)
    }

    private storeToken(token: string) {
        document.cookie = this.buildCookieString('token', token);
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

    private buildCookieString(name, value, options = null): string {
        var path, expires;
        options = options || {};
        expires = options.expires;
        path = options.path ? options.path : '/';
        if (!value) {
          expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
          value = '';
        }

        var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += path ? ';path=' + path : '';
        str += options.domain ? ';domain=' + options.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += options.secure ? ';secure' : '';

        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        var cookieLength = str.length + 1;
        if (cookieLength > 4096) {
          console.warn('Cookie \'' + name +
            '\' possibly not set or overflowed because it was too large (' +
            cookieLength + ' > 4096 bytes)!');
        }

        return str;
    }

    private lastCookies = {};
    private lastCookieString = '';

    private updateLastCookies() {

        const safeGetCookie = rawDocument => {
            try {
                return rawDocument.cookie || '';
            } catch (e) {
                return '';
            }
        };

        const safeDecodeURIComponent = str => {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        };


        let cookieArray, cookie, i, index, name;
        let currentCookieString = safeGetCookie(document);

        if (currentCookieString !== this.lastCookieString) {
          this.lastCookieString = currentCookieString;
          cookieArray = this.lastCookieString.split('; ');
          this.lastCookies = {};

          for (i = 0; i < cookieArray.length; i++) {
            cookie = cookieArray[i];
            index = cookie.indexOf('=');
            if (index > 0) { //ignore nameless cookies
              name = safeDecodeURIComponent(cookie.substring(0, index));
              // the first value that is seen for a cookie is the most
              // specific one.  values for the same cookie name that
              // follow are for less specific paths.
              if (isUndefined(this.lastCookies[name])) {
                this.lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1));
              }
            }
          }
        }
        return this.lastCookies;
    }
   
}
