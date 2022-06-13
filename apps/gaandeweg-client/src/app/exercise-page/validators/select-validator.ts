import { FormControl } from '@angular/forms';

export class SelectValidator {
  static isValid(formControl: FormControl, fieldValues: any) {
    if (fieldValues.length === 0) {
      return null;
    }

    const value = formControl.value;
    if (value === null || value === undefined) {
      return null;
    }

    const valid = fieldValues.indexOf(value) > -1;
    return valid
      ? null
      : {
          isValid: true,
        };
  }
}
