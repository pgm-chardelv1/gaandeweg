import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Exercise, ExerciseForm } from '../models';
import { ExerciseOption, RangeLabel } from '../models/exercise.model';
import {
  ExerciseFormFieldDefaultTemplate,
  ExerciseFormFieldRadioTemplate,
  ExerciseFormFieldRangeTemplate,
  ExerciseFormFieldSelectTemplate,
} from '../models/field.model';
import { fieldTypeValidator } from '../validators/field-type.validator';

@Injectable({
  providedIn: 'root',
})
export class ExerciseFormService {
  constructor(private http: HttpClient) {}

  renderExerciseTemplate(exercise: Exercise): ExerciseForm {
    const form: ExerciseForm = {
      fields: [],
    };

    if (exercise?.template) {
      const parsedExercise = JSON.parse(exercise?.template);
      for (let i = 0; i < parsedExercise.fields.length; i++) {
        const field = parsedExercise.fields[i];
        form?.fields?.push({
          fieldId: field.fieldId,
          fieldType: field.fieldType,
          fieldName: field.fieldName,
          fieldText: field.fieldText,
          fieldInfo: field.fieldInfo,
          fieldRepeat: field.fieldRepeat,
          fieldRepeatable: field.fieldRepeatable,
          fieldValues: field.fieldValues,
          fieldOptions: field.fieldOptions,
          extraField: field.extraField,
        });
      }
      return form;
    } else {
      return form;
    }
  }

  updateExercise(exercise: Partial<Exercise>): any {
    const updatedExercise = {
      ...exercise,
    };
    const body = exercise;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .patch<Exercise>(
        `${environment.API_BASEURL}/exercise/${!exercise?.id}`,
        body,
        options
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  generateDefaultFormControls(
    field: ExerciseFormFieldDefaultTemplate,
    formGroup: FormGroup
  ) {
    formGroup.registerControl(
      'id' + field.fieldId,
      new FormControl('', [Validators.required, Validators.min(1)])
    );
    formGroup.registerControl(
      'type' + field.fieldId,
      new FormControl('', [Validators.required, fieldTypeValidator])
    );
    formGroup.registerControl(
      'name' + field.fieldId,
      new FormControl('', [
        Validators.required,
        // eslint-disable-next-line no-useless-escape
        Validators.pattern('/(?:($.*):)/'),
      ])
    );
    formGroup.registerControl(
      'text' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ])
    );
    if (field.fieldInfo) {
      formGroup.registerControl(
        'info' + field.fieldId,
        new FormControl('', [
          Validators.minLength(1),
          Validators.maxLength(250),
        ])
      );
    }
  }

  generateRangeField(field: ExerciseFormFieldRangeTemplate) {
    const rangeField = {
      fieldId: field.fieldId,
      fieldType: field.fieldType,
      fieldName: field.fieldName,
      fieldText: field.fieldText,
      fieldInfo: field.fieldInfo,
      fieldOptions: {
        min: field.fieldOptions.min,
        max: field.fieldOptions.max,
        step: field.fieldOptions.step,
        icons: field.fieldOptions.icons,
      },
    };
    return rangeField;
  }

  generateRangeFieldFormControls(
    field: ExerciseFormFieldRangeTemplate,
    formGroup: FormGroup
  ) {
    formGroup.registerControl(
      'min' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ])
    );
    formGroup.registerControl(
      'max' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ])
    );
    formGroup.registerControl(
      'step' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ])
    );
    formGroup.registerControl(
      'icon1_isIcon' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.pattern(
          '/^(?:(1|y(?:es)?|t(?:rue)?|on)|(0|n(?:o)?|f(?:alse)?|off))$/i'
        ),
      ])
    );
    formGroup.registerControl(
      'icon2_isIcon' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.pattern(
          '/^(?:(1|y(?:es)?|t(?:rue)?|on)|(0|n(?:o)?|f(?:false)?|off))$/i'
        ),
      ])
    );
    formGroup.registerControl(
      'icon1_value' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.pattern('/(?:($.*):)/'),
      ])
    );
    formGroup.registerControl(
      'icon2_value' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.pattern('/(?:($.*):)/'),
      ])
    );
    this.generateDefaultFormControls(field, formGroup);
  }

  generateField(field: ExerciseFormFieldSelectTemplate) {
    const selectField = {
      fieldId: field.fieldId,
      fieldType: field.fieldType,
      fieldName: field.fieldName,
      fieldText: field.fieldText,
      fieldInfo: field.fieldInfo,
      fieldValues: field.fieldValues,
    };
    return selectField;
  }

  generateFieldValues(
    field: ExerciseFormFieldSelectTemplate | ExerciseFormFieldRadioTemplate,
    formGroup: FormGroup
  ) {
    field.fieldValues.forEach((v: ExerciseOption, i: number) => {
      formGroup.registerControl(
        `value_${i}_${field.fieldId}`,
        new FormControl('', [
          Validators.required,
          Validators.pattern('/[0-9]/'),
          Validators.min(1),
          Validators.max(10),
        ])
      );
      formGroup.registerControl(
        `label_${i}_${field.fieldId}`,
        new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('/[a-zA-Z0-9]/'),
        ])
      );
    });
  }

  generateSelectFieldFormControls(
    field: ExerciseFormFieldSelectTemplate,
    formGroup: FormGroup
  ) {
    this.generateDefaultFormControls(field, formGroup);
    this.generateFieldValues(field, formGroup);
    formGroup.registerControl(
      'repeat' + field.fieldId,
      new FormControl('', [
        Validators.required,
        Validators.pattern(
          '/(?:(1|y(?:es)?|t(?:rue)?|on)|(0|n(?:o)?|f(?:alse)?|off))$/i'
        ),
      ])
    );
  }

  generateRadioFieldFormControls(
    field: ExerciseFormFieldRadioTemplate,
    formGroup: FormGroup
  ) {
    this.generateDefaultFormControls(field, formGroup);
    this.generateFieldValues(field, formGroup);
  }
}
