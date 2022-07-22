import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fieldTypeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.toLower();

    if (!value) {
      return null;
    }

    const isString = /^[a-z]*$/.test(value);

    const isFieldType =
      isString &&
      (value === 'radio' ||
        value === 'range' ||
        value === 'select' ||
        value === 'text' ||
        value === 'date' ||
        value === 'time');

    return !isFieldType ? { fieldType: true } : null;
  };
}
