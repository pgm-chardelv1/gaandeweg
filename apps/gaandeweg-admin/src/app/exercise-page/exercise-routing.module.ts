import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExercisePage } from './exercise.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisePage,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ExerciseDetailComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'edit', component: ExerciseFormComponent }],
  },
  {
    path: 'new',
    component: ExerciseFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ExercisePageRoutingModule {}
