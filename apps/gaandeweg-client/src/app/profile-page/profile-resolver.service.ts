import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { UserExercise, UserExerciseService } from '@gaandeweg-ws/data-access';

@Injectable({ providedIn: 'root' })
export class ProfileResolverService implements Resolve<UserExercise[]> {
  /**
   * @param {string | null} uData - the user data
   */
  uData = localStorage.getItem('userData');

  constructor(private userExerciseService: UserExerciseService) {}

  /**
   * Resolves the user's exercises.
   * @param {ActivatedRouteSnapshot} _route - the route snapshot
   * @param {RouterStateSnapshot} _state - the router state snapshot
   * @returns {Promise<UserExercise[]>} - the user's exercises
   */
  async resolve(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: RouterStateSnapshot
  ): Promise<UserExercise[]> {
    const userExercises = await lastValueFrom(
      this.userExerciseService.getUserExercises(
        JSON.parse(this.uData as string)?.id
      )
    );

    if (userExercises.length === 0) {
      return await lastValueFrom(
        this.userExerciseService.getUserExercises(
          JSON.parse(this.uData as string)?.id
        )
      );
    } else {
      return userExercises;
    }
  }
}
