import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Exercise,
  ExerciseFormFieldRadioTemplate,
  ExerciseFormFieldRangeTemplate,
  ExerciseFormFieldSelectTemplate,
  ExerciseFormFieldTemplate,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-exercise-template-form-component',
  templateUrl: './exercise-template-form.component.html',
  styleUrls: ['./exercise-template-form.component.scss'],
})
export class ExerciseTemplateFormComponent implements OnInit, OnChanges {
  @Input() id: number | null = null;
  @Output() template = {
    fields: [],
  };
  isLoading = true;
  exercise!: Exercise;
  exerciseTemplateForm: FormGroup;
  data = {
    fields: [
      {
        fieldId: 0,
        fieldType: 'text',
        fieldName: 'fieldName',
        fieldText: 'fieldText',
        fieldInfo: 'fieldInfo',
        fieldOptions: {
          min: 0,
          max: 0,
          step: 0,
          snaps: false,
          icons: [
            {
              icon: false,
              value: 'iconName',
              slot: 'start',
            },
            {
              icon: false,
              value: 'iconName',
              slot: 'end',
            },
          ],
        },
        fieldValues: [
          {
            fieldValue: 'value',
            fieldLabel: 'label',
          },
        ],
      },
    ],
  };
  emptyData = this.data;

  constructor(
    public formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private exerciseFormService: ExerciseFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.exerciseTemplateForm = this.formBuilder.group({
      fields: this.formBuilder.array([]),
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
    });

    console.log('ExerciseTemplateFormComponent.ngOnInit');
    if (this.id) {
      this.exercise = await firstValueFrom(
        this.exerciseService.getExercise(this.id as number)
      );
      this.data = JSON.parse(this.exercise.template);
      this.setFields(JSON.parse(this.exercise.template));
      console.log(this.exerciseTemplateForm.controls);
    }
  }

  async ngOnChanges(exercise: SimpleChanges): Promise<void> {
    console.log('ExerciseTemplateFormComponent.ngOnChanges');
    if (this.id) {
      this.exercise = await firstValueFrom(
        this.exerciseService.getExercise(this.id as number)
      );
      this.data = JSON.parse(this.exercise.template);
      this.setFields(JSON.parse(this.exercise.template));
    }
  }

  getFormInfo() {
    console.log(this.exerciseTemplateForm.controls);
  }

  get fields() {
    return this.exerciseTemplateForm.controls['fields'] as FormArray;
  }

  addField() {
    const fieldForm = this.formBuilder.group({
      fieldId: [0, Validators.required],
      fieldType: ['', Validators.required],
      fieldName: ['', Validators.required],
      fieldText: ['', Validators.required],
      fieldInfo: [''],
      fieldOptions: this.formBuilder.group({
        min: [0],
        max: [0],
        step: [0],
        snaps: [false],
        icons: this.formBuilder.array([]),
      }),
      fieldValues: this.formBuilder.array([]),
    });
    this.fields.push(fieldForm);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  addNewValue(index: number) {
    const values = this.fields.controls[index].get('fieldValues') as FormArray;
    values.push(
      this.formBuilder.group({
        fieldValue: [''],
        fieldLabel: [''],
      })
    );
  }

  removeValue(index: number, valueIndex: number) {
    const values = this.fields.controls[index].get('fieldValues') as FormArray;
    values.removeAt(valueIndex);
  }

  addNewIcon(index: number) {
    const icons = this.fields.controls[index].get(
      'fieldOptions.icons'
    ) as FormArray;
    icons.push(
      this.formBuilder.group({
        slot: [''],
        icon: [false],
        value: [''],
      })
    );
  }

  removeIcon(index: number, iconIndex: number) {
    const icons = this.fields.controls[index].get(
      'fieldOptions.icons'
    ) as FormArray;
    icons.removeAt(iconIndex);
  }

  setFields(data: { fields: [] }) {
    this.exerciseTemplateForm = this.formBuilder.group({
      fields: this.formBuilder.array([]),
    });
    const control = <FormArray>this.exerciseTemplateForm.controls['fields'];
    data.fields.forEach((field) => {
      control.push(this.formBuilder.group(field));
    });
  }

  setFieldOptions(index: number) {
    const control = this.fields.controls[index];
    const fieldOptions = control.get('fieldOptions') as FormGroup;
    const field = this.data.fields[index];
    fieldOptions.patchValue(field.fieldOptions);
  }

  setFieldValues(index: number) {
    const control = this.fields.controls[index];
    const fieldValues = control.get('fieldValues') as FormArray;
    const field = this.data.fields[index];
    field.fieldValues.forEach((value) => {
      fieldValues.push(this.formBuilder.group(value));
    });
  }
}
