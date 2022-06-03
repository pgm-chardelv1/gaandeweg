import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesService } from './services/exercise.service';

@NgModule({
  imports: [CommonModule],
  providers: [ExercisesService],
})
export class DataAccessModule {}
