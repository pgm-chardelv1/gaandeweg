import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ExercisesService } from './services/exercises.service';
import {
  Exercise,
  ExerciseForm,
  ExerciseFormField,
} from './models/exercise.model';
import {
  FormArray,
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
  activeExercise: Exercise = {
    id: 0,
    version: '',
    categoryId: 0,
    name: '',
    summary: '',
    template: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    publishedBy: '',
  };
  activeExerciseForm: Partial<ExerciseForm> = {};
  formControls = new FormArray([]);

  myGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private exercisesService: ExercisesService,
    public formBuilder: FormBuilder,
    private loggingService: LoggingService
  ) {}

  async ngOnInit() {
    this.exercises = await firstValueFrom(this.exercisesService.getExercises());
    this.myGroup = this.formBuilder.group({});
    /*     this.myGroup = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      suicidalThoughts: ['', Validators.required],
      selfHarm: ['', Validators.required],
      alcohol: ['', Validators.required],
    }); */
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
    this.activeExerciseForm = this.exercisesService.renderExerciseTemplate(
      this.activeExercise
    );
    this.loggingService.log(
      `Active exercise set to: #${this.activeExercise.id} - ${this.activeExercise.name}`
    );

    this.activeExerciseForm?.fields?.forEach((field) => {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl('', Validators.required)
      );
    });
  }

  get errorControl() {
    return this.myGroup.controls;
  }

  addFormControl(field: ExerciseFormField) {
    this.myGroup.registerControl(
      field.fieldName,
      new FormControl(field.fieldName, Validators.required)
    );
  }
}
