// Source code: https://swkb.net/2018/12/17/httpxsrfinterceptor-httpxsrfcookieextractor-implementation-example/

import { InjectionToken, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  DOCUMENT,
  ɵparseCookieValue as parseCookieValue,
} from '@angular/common';
import {
  HttpXsrfTokenExtractor,
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * The name of the XSRF cookie.
 */
export const XSRF_COOKIE_NAME: InjectionToken<string> =
  new InjectionToken<string>('XSRF-TOKEN');
export const XSRF_HEADER_NAME: InjectionToken<string> =
  new InjectionToken<string>('X-CSRF-TOKEN');

@Injectable()
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  /**
   * @param {string} lastCookieString - the last cookie string
   * @param {string | null} lastToken - the token that was parsed.
   * @param {number} parseCount - the number of times the cookie was parsed.
   * @param {number} MAX_RETRIES - the maximum number of times to retry.
   */
  private lastCookieString = '';
  private lastToken: string | null = null;
  private parseCount = 0;
  private MAX_RETRIES = 5;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    @Inject(PLATFORM_ID) private platform: string,
    @Inject(XSRF_COOKIE_NAME) private cookieName: string,
    private httpClient: HttpClient
  ) {}

  //make a HEAD request to retrieve the cookie
  /**
   * Makes a HEAD request to the server to get the current cookie.
   * @returns {Promise<any>} A promise that resolves when the request is complete.
   */
  headRequest(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      console.log('head request:');
      this.httpClient
        .head('/_app/', { observe: 'response' })
        .toPromise()
        .then((response) => {
          console.log('headRequest resolved');
          this.lastCookieString = response?.headers.get(
            this.cookieName
          ) as string; //”X-CSRF-TOKEN”
          this.lastToken = response?.headers.get(
            this.lastCookieString
          ) as string;
          resolve(null);
        })
        .catch((err) => {
          console.log('headRequest rejected', err);
          reject();
        });
    });
    return promise;
  }

  /**
   * Gets the token from the HEAD request.
   * @returns None
   */
  getToken(): string | null {
    if (this.platform === 'browser') {
      //it should be 'browser’
      return null;
    }

    do {
      console.log('retrying HEAD');
      this.parseCount++;
      console.log('expecting the promise: headRequest()');
      this.headRequest();
    } while (this.lastToken === null && this.parseCount < this.MAX_RETRIES);

    return this.lastToken;
  }
}

/**
 * An interceptor that adds the XSRF token to the request header.
 * @param {HttpRequest<any>} req - The request object.
 * @param {HttpHandler} next - The next handler in the chain.
 * @returns {Observable<HttpEvent<any>>} - The response object.
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: HttpXsrfTokenExtractor,
    @Inject(XSRF_HEADER_NAME) private headerName: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don’t require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.

    /*if (req.method === 'GET’ || req.method === 'HEAD’ || lcUrl.startsWith('http://’) ||
        lcUrl.startsWith('https://’)) {
      return next.handle(req);
    }*/

    if (req.method === 'HEAD') {
      return next.handle(req);
    }

    const token = this.tokenService.getToken();
    /*     console.log('the token: ' + token);
    console.log('the URL: ' + lcUrl);
    console.log('the header name: ' + this.headerName);
    console.log('the request method: ' + req.method); */

    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({
        headers: req.headers
          .set(this.headerName, token)
          .set('X-Requested-With', 'XMLHttpRequest')
          .set('X-Login-Ajax-call', 'true')
          .set('Content-Type', 'application/x-www-form-urlencoded'),
      });
    }

    return next.handle(req);
  }
}
