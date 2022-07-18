import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { User } from './user.model';

/**
 * The response data from the authentication request.
 * @typedef {Object} AuthResponseData
 * @property {string} message - The message from the server.
 * @property {string} access_token - The access token.
 * @property {string} expiresIn - The time in seconds until the access token expires.
 */
export interface AuthResponseData {
  message: string;
  access_token: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sign up a user with the given email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns A promise that resolves to the AuthResponseData object.
   */
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.API_BASEURL}/auth/register`, {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.access_token, resData.expiresIn);
        })
      );
  }

  /**
   * Attempts to log in with the given email and password.
   * @param {string} email - the email to log in with.
   * @param {string} password - the password to log in with.
   * @returns A promise that resolves to the auth response data.
   */
  login(email: string, password: string) {
    console.log('Attempted login with email: ' + email);
    return this.http
      .post<AuthResponseData>(
        `${environment.API_BASEURL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.access_token, resData.expiresIn);
        })
      );
  }

  /**
   * Automatically logs the user in if they have a valid token.
   * @returns None
   */
  autoLogin() {
    const userData: {
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') as string);

    if (!userData) {
      return;
    }

    const tokenData = this.getDecodedAccessToken(userData._token);

    const loadedUser = new User(
      userData._token,
      new Date(userData._tokenExpirationDate),
      tokenData.sub.id
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  /**
   * Logs the user out.
   * @returns None
   */
  logout() {
    this.user.next({} as User);
    this.router.navigate(['/app/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Sets a timer to automatically log the user out after a certain amount of time.
   * @param {number} expirationDuration - the amount of time in milliseconds that the user should be logged out.
   * @returns None
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * Handles the authentication of the user.
   * @param {string} token - the token of the user.
   * @param {string} expiresIn - the time until the token expires.
   * @returns None
   */
  private handleAuthentication(token: string, expiresIn: string) {
    const expirationDate = this.getExpirationDuration(expiresIn);
    const userId = this.getDecodedAccessToken(token).sub.id;
    const user = new User(token, expirationDate, userId);
    this.user.next(user);
    this.autoLogout(dayjs(expirationDate).unix());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Handles errors that occur during the sign in process.
   * @param {HttpErrorResponse} errorRes - The error response object.
   * @returns {Observable<string>} - The error message.
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Dit email adres bestaat reeds.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Onjuist email adres.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Onjuist wachtwoord.';
        break;
    }
    return throwError(() => errorMessage);
  }

  /**
   * Takes in a string of the format "x [s|m|h|d|w|M|y]" and returns a Date object that represents the
   * time that the cookie expires.
   * @param {string} expiresIn - the string of the format "x [s|m|h|d|w|M|y]"
   * @returns {Date} - the Date object that represents the time that the cookie expires.
   */
  private getExpirationDuration(expiresIn: string): Date {
    // Get the amount from the expiration date
    const amount = expiresIn.slice(0, -1);
    // Get the unit from the expiration date or use second if no unit is given
    const unit = expiresIn.slice(-1) as dayjs.ManipulateType | 's';

    return dayjs()
      .add(+amount, unit)
      .toDate();
  }
}
