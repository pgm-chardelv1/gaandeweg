import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
  // Source: https://ionicthemes.com/tutorials/forms-and-validation-in-ionic
  static areEqual(formGroup: FormGroup) {
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
  }
}
