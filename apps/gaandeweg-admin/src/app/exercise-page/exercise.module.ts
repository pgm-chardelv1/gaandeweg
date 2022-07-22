import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExerciseTemplateFormComponent } from './exercise-form/exercise-template-form/exercise-template-form.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExercisePageRoutingModule } from './exercise-routing.module';
import { ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExercisePage } from './exercise.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisePageRoutingModule,
    FontAwesomeModule,
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
    ExerciseTemplateFormComponent,
  ],
})
export class ExercisePageModule {}
