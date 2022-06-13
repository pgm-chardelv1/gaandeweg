import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewExerciseComponent } from './new-exercise.component';

const routes: Routes = [
  {
    path: 'new-exercise',
    component: NewExerciseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExerciseComponentRoutingModule {}
