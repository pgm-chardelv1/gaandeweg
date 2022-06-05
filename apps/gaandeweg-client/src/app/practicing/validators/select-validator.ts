import { FormControl, FormGroup } from '@angular/forms';

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
/* static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (const key in formGroup.controls) {
      if (Object.prototype.hasOwnProperty.call(formGroup.controls, key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value;
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true,
    };
  } */
