import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExercisePageRoutingModule } from './exercise-routing.module';
import { ExercisePage } from './exercise.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ExercisePage],
})
export class ExercisePageModule {}
