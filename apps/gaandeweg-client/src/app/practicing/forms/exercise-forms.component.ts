import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { ExercisesService } from '../services/exercises.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gaandeweg-ws-exercise-forms',
  templateUrl: './exercise-forms.component.html',
  styleUrls: ['./exercise-forms.component.scss'],
})
export class ExerciseFormsComponent implements OnInit {
  exerciseForm: Observable<Exercise> | undefined;

  exerciseFormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    suicidalThoughts: new FormControl('', [Validators.required]),
    selfHarm: new FormControl('', [Validators.required]),
    alcohol: new FormControl('', [Validators.required]),
  });

  constructor(private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exerciseForm = this.exercisesService.getExercise(1);
  }

  onSubmit() {
    console.log(this.exerciseFormGroup.value);
  }

  submitForm() {
    console.log(this.exerciseFormGroup.value);
  }
}
