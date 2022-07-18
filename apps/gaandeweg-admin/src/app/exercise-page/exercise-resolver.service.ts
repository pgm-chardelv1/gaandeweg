import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { Exercise, ExerciseService } from '@gaandeweg-ws/data-access';

@Injectable({ providedIn: 'root' })
export class ExerciseResolverService implements Resolve<Exercise[]> {
  constructor(private exerciseService: ExerciseService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Exercise[]> {
    const exercises = await lastValueFrom(this.exerciseService.getExercises());

    if (exercises.length === 0) {
      return await lastValueFrom(this.exerciseService.getExercises());
    } else {
      return exercises;
    }
  }
}
