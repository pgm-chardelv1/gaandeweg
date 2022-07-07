import { IonicModule } from '@ionic/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExercisePage } from './exercise.page';

import { ExercisePageRoutingModule } from './exercise-routing.module';
import { NewExerciseComponentModule } from './new-exercise/new-exercise.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    ExercisePageRoutingModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    NewExerciseComponentModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [ExercisePage],
})
export class ExercisePageModule {}
