import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetadata } from '../../static.metadata';
import { ExerciseFormComponent } from './exercise-form.component';

const routes: Routes = [
  {
    path: 'edit',
    data: sectionsMetadata.exerciseDetailPage,
    component: ExerciseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseFormComponentRoutingModule {}
