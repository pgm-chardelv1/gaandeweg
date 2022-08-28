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
import {
  PickerColumn,
  PickerController,
  PopoverController,
} from '@ionic/angular';
import { firstValueFrom, Subscription } from 'rxjs';

import {
  Exercise,
  ExerciseForm,
  ExerciseFormField,
  ExerciseFormService,
  ExerciseService,
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Router } from '@angular/router';
import { PopoverComponent } from '../../shared/components/PopoverComponent/popover.component';

@Component({
  selector: 'gaandeweg-ws-new-exercise',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  providers: [
    ExerciseService,
    ExerciseFormService,
    LoggingService,
    UserExerciseService,
  ],
})
export class ExerciseFormComponent implements OnChanges, OnInit {
  /**
   * @param {number} exerciseId - the id of the exercise to load.
   * @param exercise - The exercise object.
   * @param exerciseForm - The form object.
   * @param formControls - The form array object.
   * @param myGroup - The form group object.
   * @param isSubmitted - The boolean value for if the form has been submitted.
   * @param validation_messages - The validation messages object.
   * @param user - The user object.
   * @param userSub - The user subscription object.
   */
  @Input() exerciseId!: number;
  exercise!: Exercise;
  exerciseForm: Partial<ExerciseForm> = {};
  formControls = new FormArray([]);
  myGroup!: FormGroup;
  isSubmitted = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation_messages: any = {};
  user: User = new User('', new Date(), '');
  userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private exerciseFormService: ExerciseFormService,
    private exerciseService: ExerciseService,
    private logger: LoggingService,
    public formBuilder: FormBuilder,
    private userExerciseService: UserExerciseService,
    private router: Router,
    private pickerCtrl: PickerController,
    private popoverCtrl: PopoverController
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ngOnChanges(_exerciseId: SimpleChanges): Promise<void> {
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

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.logger.log('client', user.token as string);
      this.user = user;
    });
    this.logger.log(
      'client',
      `User: ${this.user}
    User in local storage: ${localStorage.getItem('userData')}`
    );
  }

  registerControl(field: ExerciseFormField): void {
    if (this.fieldIsRange(field)) {
      if (field.fieldOptions) {
        this.myGroup.registerControl(
          field.fieldName,
          new FormControl(
            'null',
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
    } else if (field.fieldType === 'TIME') {
      this.myGroup.registerControl(
        field.fieldName,
        new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]{2}:[0-9]{2}$/),
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

  async openPicker(field: ExerciseFormField): Promise<void> {
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
        },
        {
          text: 'Opslaan',
          handler: (opt) => {
            const val: Array<{ value: any }> = Object.values(opt);
            const value = val[0].value;
            this.myGroup.controls[field.fieldName].setValue(value);
            this.logger.log('client', `Value selected from picker: ${value}`);
          },
        },
      ],
      columns: this.getPickerColumns(field),
    });
    await picker.present();
  }

  presentInfoPopover = async (ev: any) => {
    this.logger.log('client', `Presenting info popover with content ${ev}`);
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: {
        content: ev,
      },
      event: ev,
      translucent: true,
      cssClass: 'popover--info',
    });
    return await popover.present();
  };

  getPickerColumns(field: ExerciseFormField): PickerColumn[] {
    const { min, max } = field.fieldOptions as { min: number; max: number };
    const values = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    return [
      {
        name: field.fieldName,
        options: values.map((value) => ({ text: value.toString(), value })),
      },
    ] as PickerColumn[];
  }

  async onSubmit(): Promise<boolean> {
    try {
      this.isSubmitted = true;

      if (!this.myGroup.valid) {
        alert('Vul alle velden in');
        return false;
      } else {
        this.logger.log(
          'client',
          `Submitting exercise form with values: ${this.myGroup.value}
        Valid: ${this.myGroup.valid}
        User: ${this.user}`
        );
        const userFromLocalStorage = JSON.parse(
          localStorage.getItem('userData') as string
        );
        if (!this.user && !userFromLocalStorage) {
          alert('Je moet ingelogd zijn om deze actie uit te kunnen voeren');
        }
        const userExercise: UserExercise = {
          exerciseName: this.exercise.name,
          exerciseTemplate: this.exercise.template,
          exerciseData: JSON.stringify(this.myGroup.value),
          userId: this.user?.id ? this.user?.id : userFromLocalStorage?.id,
        };
        this.userExerciseService
          .createUserExercise(userExercise)
          .subscribe((data) => {
            this.logger.log('client', `Created user exercise: ${data}`);
          });
        this.router.navigate(['/app/profile/list']);
        return true;
      }
    } catch (err) {
      alert('Er is iets fout gegaan');
      return false;
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
