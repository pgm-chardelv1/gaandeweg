import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesService } from './services/exercises.service';
import { Exercise } from './models/exercise.model';

@Component({
  selector: 'gaandeweg-ws-practicing',
  templateUrl: 'practicing.page.html',
  styleUrls: ['practicing.page.scss'],
})
export class PracticingPage implements OnInit {
  exercises: Observable<Exercise[]> | undefined;
  activeExercise: Observable<Exercise> | undefined;
  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercises = this.exercisesService.getExercises();
  }

  setActive(id: number) {
    this.activeExercise = this.exercisesService.getExercise(id);
    console.log('active exercise: ', this.activeExercise);
  }
}
