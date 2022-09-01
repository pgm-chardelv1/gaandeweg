import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetadata } from '../static.metadata';

import { ExercisePage } from './exercise.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisePage,
    data: sectionsMetadata.exercisePage,
    pathMatch: 'full',
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./exercise-form/exercise-form.module').then(
        (m) => m.ExerciseFormComponentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisePageRoutingModule {}
