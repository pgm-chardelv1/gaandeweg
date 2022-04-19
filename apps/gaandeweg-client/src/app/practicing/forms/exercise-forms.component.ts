import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { ExercisesService } from '../services/exercises.service';

@Component({
  selector: 'gaandeweg-ws-exercise-forms',
  templateUrl: './exercise-forms.component.html',
  styleUrls: ['./exercise-forms.component.scss'],
})
export class ExerciseFormsComponent implements OnInit {
  exerciseForm: Observable<Exercise> | undefined;
  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exerciseForm = this.exercisesService.getExercise(1);
  }
}
