import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExerciseResolverService } from './exercise-resolver.service';
import { ExercisePage } from './exercise.component';
import { sectionsMetadata } from '../static.metadata';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.exercisePage,
    component: ExercisePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: sectionsMetadata.exercisePage,
        component: ExerciseStartComponent,
      },
      {
        path: ':id/edit',
        data: sectionsMetadata.exerciseDetailPage,
        component: ExerciseFormComponent,
        resolve: [ExerciseResolverService],
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        data: sectionsMetadata.exerciseDetailPage,
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
