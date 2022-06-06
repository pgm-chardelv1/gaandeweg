import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

/**
 * A guard that checks if the user is authenticated.
 * @param {AuthService} authService - The auth service to check if the user is authenticated.
 * @param {Router} router - The router to redirect the user to the login page if they are not authenticated.
 * @returns A boolean or a UrlTree.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          if (localStorage.getItem('userData')) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth']);
          }
        }
        return this.router.createUrlTree(['']);
      })
    );
  }
}
