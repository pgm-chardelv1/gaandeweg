import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ExerciseTemplateFormComponent } from './exercise-template-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [ExerciseTemplateFormComponent],
  exports: [ExerciseTemplateFormComponent],
})
export class ExerciseTemplateFormModule {}
