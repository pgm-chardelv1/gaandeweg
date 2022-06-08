import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ExerciseFormComponent } from './exercise-form.component';
import { ExerciseTemplateFormModule } from './exercise-template-form/exercise-template-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExerciseTemplateFormModule,
    SharedModule,
  ],
  declarations: [ExerciseFormComponent],
  exports: [ExerciseFormComponent],
})
export class ExerciseFormComponentModule {}
