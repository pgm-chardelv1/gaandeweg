import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExerciseResolverService } from './exercise-resolver.service';
import { ExercisePage } from './exercise.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExerciseStartComponent,
      },
      {
        path: ':id/edit',
        component: ExerciseFormComponent,
        resolve: [ExerciseResolverService],
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        component: ExerciseFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ExercisePageRoutingModule {}
