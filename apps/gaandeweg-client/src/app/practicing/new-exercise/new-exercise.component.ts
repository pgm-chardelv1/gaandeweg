import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LoggingService } from '../../logging.service';
import {
  Exercise,
  ExerciseForm,
  ExerciseFormField,
  ExerciseFormFieldRange,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'gaandeweg-ws-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
  providers: [ExerciseService, ExerciseFormService, LoggingService],
})
export class NewExerciseComponent implements OnChanges {
  @Input() exerciseId!: number;
  exercise!: Exercise;
  exerciseForm: Partial<ExerciseForm> = {};
  formControls = new FormArray([]);
  myGroup!: FormGroup;
  isSubmitted = false;
  validation_messages: any = {};

  constructor(
    private exerciseFormService: ExerciseFormService,
    private exerciseService: ExerciseService,
    private loggingService: LoggingService,
    public formBuilder: FormBuilder
  ) {}

  async ngOnChanges(exerciseId: SimpleChanges): Promise<void> {
    console.log(this.exerciseId);
    this.exercise = await firstValueFrom(
      this.exerciseService.getExercise(this.exerciseId)
    );
    this.myGroup = this.formBuilder.group({});
    this.exerciseForm = this.exerciseFormService.renderExerciseTemplate(
      this.exercise
    );
    this.exerciseForm?.fields?.forEach((field) => {
      this.registerControl(field);
    });
  }

  registerControl(field: ExerciseFormField): void {
    // Register validators for range fields
    if (this.fieldIsRange(field) && field.fieldOptions) {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.min(field.fieldOptions.min),
            Validators.max(field.fieldOptions.max),
            Validators.pattern(/^[0-9]*$/),
          ])
        )
      );
      this.validation_messages = {
        ...this.validation_messages,
        [`${field.fieldText}`]: [
          {
            type: 'required',
            message: `${field.fieldName} mag niet leeg zijn`,
          },
          {
            type: 'min',
            message: `${field.fieldName} moet minimaal ${field.fieldOptions.min} zijn`,
          },
          {
            type: 'max',
            message: `${field.fieldName} moet maximaal ${field.fieldOptions.max} zijn`,
          },
          {
            type: 'pattern',
            message: `${field.fieldName} moet een getal zijn`,
          },
        ],
      };

      // Register validators for text fields
    } else if (field.fieldType === 'TEXT') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(350),
          ])
        )
      );

      // Register validators for number fields
    } else if (field.fieldType === 'NUMBER') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern(/^[0-9]*$/),
          ])
        )
      );

      // Register validators for select fields
    } else if (field.fieldType === 'SELECT') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(null, [Validators.required])
      );

      // Register validators for radio fields
    } else if (field.fieldType === 'RADIO') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(null, [Validators.required])
      );

      // Register validators for date fields
    } else if (field.fieldType === 'DATE') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
          ])
        )
      );
    } else {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl('', Validators.required)
      );
    }
  }

  /* onCreateExercise(data: any) {
    this.newExercise.emit(data);
  } */

  onSubmit() {
    console.log('Form:', this.myGroup.value);

    this.isSubmitted = true;

    if (!this.myGroup.valid) {
      console.log(this.myGroup.controls);
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.myGroup.value);
      this.loggingService.log(this.myGroup.value);
      return true;
    }
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
    // console.log(field as ExerciseFormFieldRange);
    return (
      field.fieldType === 'RANGE' &&
      field.fieldOptions &&
      field.fieldOptions.max &&
      (field.fieldOptions.min === 0 || field.fieldOptions.min === 1) &&
      field.fieldOptions.step &&
      field.fieldOptions.icons &&
      field.fieldOptions.icons.length === 2
    );
  }
}
