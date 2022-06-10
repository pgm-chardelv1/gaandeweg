import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExercisePageRoutingModule } from './exercise-routing.module';
import { ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExercisePage } from './exercise.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    ExercisePage,
    ExerciseListComponent,
    ExerciseFormComponent,
    ExerciseStartComponent,
  ],
})
export class ExercisePageModule {}
