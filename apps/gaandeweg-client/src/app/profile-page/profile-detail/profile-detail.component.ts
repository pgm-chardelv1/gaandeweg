import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Subscription } from 'rxjs';

import {
  ExerciseForm,
  ExerciseFormField,
  ExerciseFormService,
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gaandeweg-ws-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
/**
 * Displays the user profile.
 * @class ProfileDetailComponent
 */
export class ProfileDetailComponent implements OnInit {
  /**
   * @param {boolean} isLoading Component loading state
   * @param {UserExercise} userExercise The user exercise
   * @param {UserData} userData The user data
   */
  userExerciseId = 11;
  private exerciseData = '';
  isLoading = true;
  userExercise!: UserExercise;
  userData = JSON.parse(localStorage.getItem('userData') as string);
  formValues: Array<any> = [];
  exerciseForm: Partial<ExerciseForm> = {};
  formControls: FormArray = new FormArray([]);
  myGroup!: FormGroup;
  isSubmitted = false;
  validation_messages: any = {};
  user: User = new User('', new Date(), '');
  userSub: Subscription = new Subscription();

  constructor(
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private exerciseFormService: ExerciseFormService,
    private userExerciseService: UserExerciseService
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    this.logger.log('client', 'ProfileDetailComponent.ngOnInit');
    this.route.params.subscribe(async (params: Params) => {
      this.userExerciseId = +params['id'];
      if (this.userExerciseId) {
        this.userExercise = await lastValueFrom(
          this.userExerciseService.getUserExercise(
            this.userExerciseId,
            this.userData.id
          )
        );
        this.exerciseData = this.userExercise.exerciseData;

        this.logger.log(
          'client',
          `ProfileDetailComponent.ngOnInit.IsInitiated: #${this.userExercise.id}`
        );
        this.myGroup = this.formBuilder.group({});

        this.exerciseForm = this.exerciseFormService.renderExerciseTemplate(
          this.userExercise
        );

        this.exerciseForm?.fields?.forEach((field) => {
          this.addFormControl(field);
        });

        this.setFormValues();
      } else {
        this.logger.log('client', 'ProfileDetailComponent.ngOnInit.NoId');
      }
    });

    this.isLoading = false;
  }

  setFormValues() {
    this.logger.log('client', 'ProfileDetailComponent.setFormValues');
    const exData = JSON.parse(this.userExercise.exerciseData);
    const control = this.myGroup.controls;
    Object.entries(exData).forEach(([key, val]) => {
      control[key].setValue(val);
    });
  }

  registerControl(field: ExerciseFormField): void {
    if (this.fieldIsRange(field)) {
      if (field.fieldOptions) {
        this.myGroup.registerControl(
          field.fieldName,
          new FormControl(
            '',
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
      } else {
        this.logger.log(
          'client',
          'Detected a range field, but could not detect the field options'
        );
      }

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
          0,
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
        this.formValues[field.fieldId - 1],
        new FormControl('', [Validators.required])
      );

      // Register validators for radio fields
    } else if (field.fieldType === 'RADIO') {
      this.myGroup.registerControl(
        this.formValues[field.fieldId - 1],
        new FormControl('', [Validators.required])
      );

      // Register validators for date fields
    } else if (field.fieldType === 'DATE') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
          ])
        )
      );
    } else if (field.fieldType === 'TIME') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]{2}:[0-9]{2}$/),
          ])
        )
      );
    } else {
      this.myGroup.registerControl(
        '',
        new FormControl(this.formValues[field.fieldId - 1], Validators.required)
      );
    }
  }

  async ngOnChanges(activeId: SimpleChanges): Promise<void> {
    this.logger.log('client', 'ProfileDetailComponent.ngOnChanges');
    this.userExercise = await lastValueFrom(
      this.userExerciseService.getUserExercise(
        this.userExerciseId,
        this.userData.id
      )
    );

    this.exerciseForm?.fields?.forEach((field) => {
      this.addFormControl(field);
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

  async onSubmit(): Promise<boolean> {
    this.isSubmitted = true;

    if (!this.myGroup.valid) {
      alert('Please provide all the required values!');
      return false;
    } else {
      this.logger.log('client', this.myGroup.value);
      const userExercise: UserExercise = {
        exerciseName: this.userExercise.exerciseName,
        exerciseTemplate: this.userExercise.exerciseTemplate,
        exerciseData: JSON.stringify(this.myGroup.value),
        userId: this.userData.id
          ? this.userData.id
          : '91645816-60ad-41d8-b287-e843d3f408b7',
      };
      const exSubmitted = this.userExerciseService.updateUserExercise(
        this.userExerciseId,
        userExercise,
        this.userData.id
      );

      this.router.navigate(['app', 'profile', 'list']);
      return true;
    }
  }
}
