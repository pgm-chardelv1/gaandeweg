import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import * as dayjs from 'dayjs';

import { User } from './user.model';

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

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3333/api/auth/register', {
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

  login(email: string, password: string) {
    console.log('Attempted login with email: ' + email);
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3333/api/auth/login',
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

  autoLogin() {
    const userData: {
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') as string);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next({} as User);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(token: string, expiresIn: string) {
    const expirationDate = this.getExpirationDuration(expiresIn);
    const user = new User(token, expirationDate);
    this.user.next(user);
    this.autoLogout(dayjs(expirationDate).unix());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Dit email adres bestaat al.';
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
