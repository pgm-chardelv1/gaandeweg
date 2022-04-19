import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseFormsComponent } from './exercise-forms.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [ExerciseFormsComponent],
  exports: [ExerciseFormsComponent],
})
export class ExerciseFormsModule {}
