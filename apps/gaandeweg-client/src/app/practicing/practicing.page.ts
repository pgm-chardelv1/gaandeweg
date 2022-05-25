import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ExercisesService } from './services/exercises.service';
import { Exercise, ExerciseForm } from './models/exercise.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'gaandeweg-ws-practicing',
  templateUrl: 'practicing.page.html',
  styleUrls: ['practicing.page.scss'],
  providers: [ExercisesService, LoggingService],
})
export class PracticingPage implements OnInit {
  exercises: Exercise[] = [];
  activeExercise: Partial<Exercise> = {};
  activeExerciseForm: Partial<ExerciseForm> = {};

  myGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private exercisesService: ExercisesService,
    public formBuilder: FormBuilder,
    private loggingService: LoggingService
  ) {}

  async ngOnInit() {
    this.exercises = await firstValueFrom(this.exercisesService.getExercises());
    console.log(this.exercises);

    this.activeExerciseForm = this.exercisesService.renderExerciseTemplate(
      this.exercises[0]
    );

    this.myGroup = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      suicidalThoughts: ['', Validators.required],
      selfHarm: ['', Validators.required],
      alcohol: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form:', this.myGroup.value);
    this.isSubmitted = true;
    if (!this.myGroup.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.myGroup.value);
      this.loggingService.log(this.myGroup.value);
      return true;
    }
  }

  async setActive(id: number) {
    this.activeExercise = await firstValueFrom(
      this.exercisesService.getExercise(id)
    );
    console.log('active exercise: ', this.activeExercise);
    console.log('active exercise form: ', this.activeExerciseForm);
    this.loggingService.log(
      `Active exercise set to: #${this.activeExercise.id} - ${this.activeExercise.name}`
    );
  }

  get errorControl() {
    return this.myGroup.controls;
  }
}
