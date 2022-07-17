import { Injectable } from '@angular/core';
import { UserExercise, UserExerciseService } from '@gaandeweg-ws/data-access';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileResolverService implements Resolve<UserExercise[]> {
  uData = localStorage.getItem('userData');
  constructor(private userExerciseService: UserExerciseService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
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
