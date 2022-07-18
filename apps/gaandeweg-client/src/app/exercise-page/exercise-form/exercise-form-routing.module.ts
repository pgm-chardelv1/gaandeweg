import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseFormComponent } from './exercise-form.component';

const routes: Routes = [
  {
    path: 'edit',
    component: ExerciseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseFormComponentRoutingModule {}
