import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from './user.model';
import { LoggingService } from '@gaandeweg-ws/data-access';

@Injectable()
/**
 * An interceptor that adds the auth token to the request.
 * @param {HttpRequest<any>} req - the request to modify
 * @param {HttpHandler} next - the next interceptor in the chain
 * @returns {Observable<HttpEvent<any>>} - the modified request
 */
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private logger: LoggingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user || !user.token) {
          const uData = localStorage.getItem('userData');
          if (uData !== null) {
            // console.log('uData', JSON.parse(uData).id);
            const modifiedReq = req.clone({
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${JSON.parse(uData)._token}`
              ),
            });
            return next.handle(modifiedReq);
          }
          /*           this.logger.log(
            'client/auth-interceptor.service.ts',
            `User found: false. User data found: ${localStorage.getItem(
              'userData'
            )}`
          ); */
          return next.handle(req);
        } else {
          const modifiedReq = req.clone({
            headers: new HttpHeaders().set(
              'Authorization',
              `Bearer ${user.token as string}`
            ),
          });
          return next.handle(modifiedReq);
        }
      })
    );
  }
}
