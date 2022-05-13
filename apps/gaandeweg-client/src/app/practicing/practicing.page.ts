import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ExercisesService } from './services/exercises.service';
import { Exercise } from './models/exercise.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'gaandeweg-ws-practicing',
  templateUrl: 'practicing.page.html',
  styleUrls: ['practicing.page.scss'],
})
export class PracticingPage implements OnInit {
  exercises: Exercise[] = [];
  activeExercise: Observable<Exercise> | undefined;

  ionicForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private exercisesService: ExercisesService,
    public formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.exercises = await firstValueFrom(this.exercisesService.getExercises());
    console.log(this.exercises);

    this.ionicForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      suicidalThoughts: ['', Validators.required],
      selfHarm: ['', Validators.required],
      alcohol: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.ionicForm.value);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      return true;
    }
  }

  setActive(id: number) {
    this.activeExercise = this.exercisesService.getExercise(id);
    console.log('active exercise: ', this.activeExercise);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
