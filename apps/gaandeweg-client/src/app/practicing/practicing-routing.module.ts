import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticingPage } from './practicing.page';

const routes: Routes = [
  {
    path: '',
    component: PracticingPage,
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
export class PracticingPageRoutingModule {}
