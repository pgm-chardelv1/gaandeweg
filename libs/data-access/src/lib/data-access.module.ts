import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseService } from './services/exercise.service';

@NgModule({
  imports: [CommonModule],
  providers: [ExerciseService],
})
export class DataAccessModule {}
