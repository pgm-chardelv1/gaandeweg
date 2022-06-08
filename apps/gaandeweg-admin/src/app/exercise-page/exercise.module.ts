import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExerciseFormComponentModule } from './exercise-form/exercise-form.module';
import { ExercisePageRoutingModule } from './exercise-routing.module';
import { ExercisePage } from './exercise.component';

@NgModule({
  imports: [
    CommonModule,
    ExerciseFormComponentModule,
    ExercisePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ExercisePage],
})
export class ExercisePageModule {}
