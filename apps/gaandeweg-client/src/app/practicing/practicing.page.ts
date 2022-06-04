import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  Exercise,
  ExerciseForm,
  ExerciseFormField,
  ExercisesService,
} from '@gaandeweg-ws/data-access';
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
    category: {
      id: 0,
      version: '',
      name: '',
      summary: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      updatedBy: '',
    },
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
  }

  /**
   * This function is called when the form is submitted.
   * It checks to make sure that all the required fields are filled in.
   * If they are, it logs the form data to the console.
   * @returns None
   */
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

  /**
   * Sets the active exercise to the one with the given id.
   * @param {number} id - the id of the exercise to set as active
   * @returns None
   */
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

  /**
   * Get the error control object for the form group.
   * @returns {FormGroup} The form group object.
   */
  get errorControl() {
    return this.myGroup.controls;
  }

  /**
   * Adds a form control to the form group.
   * @param {ExerciseFormField} field - the field to add to the form group.
   * @returns None
   */
  addFormControl(field: ExerciseFormField) {
    this.myGroup.registerControl(
      field.fieldName,
      new FormControl(field.fieldName, Validators.required)
    );
  }

  fieldIsRange(field: ExerciseFormField) {
    if (field.fieldType === 'RANGE') {
      if (field.fieldOptions) {
        if (
          field.fieldOptions.max &&
          (field.fieldOptions.min == 0 || field.fieldOptions.min == 1) &&
          field.fieldOptions.step &&
          field.fieldOptions.icons &&
          field.fieldOptions.icons.length === 2
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
