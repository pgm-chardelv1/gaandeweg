import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
/**
 * An interceptor that adds the auth token to the request.
 * @param {HttpRequest<any>} req - the request to modify
 * @param {HttpHandler} next - the next interceptor in the chain
 * @returns {Observable<HttpEvent<any>>} - the modified request
 */
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set(
            'authorization',
            `Bearer ${user.token as string}`
          ),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
