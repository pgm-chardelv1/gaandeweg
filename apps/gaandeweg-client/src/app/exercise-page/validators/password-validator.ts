import { FormControl, FormGroup } from '@angular/forms';

/**
 * Validate whether the passwords in the form group are equal.
 * @param {FormGroup} formGroup - the form group to validate
 * @returns {ValidationErrors} - the error object
 */
export class PasswordValidator {
  // Source: https://ionicthemes.com/tutorials/forms-and-validation-in-ionic
  /**
   * Checks if all the controls in a form group have the same value.
   * @param {FormGroup} formGroup - the form group to check
   * @returns {null} if the values are equal, otherwise returns an object with
   * the key areEqual set to true.
   */
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
