import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisePage } from './exercise.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisePage,
    pathMatch: 'full',
  },
  {
    path: 'new-exercise',
    loadChildren: () =>
      import('./new-exercise/new-exercise.module').then(
        (m) => m.NewExerciseComponentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisePageRoutingModule {}
