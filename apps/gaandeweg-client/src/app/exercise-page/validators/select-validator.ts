import { FormControl } from '@angular/forms';

/**
 * A validator that checks if the value of the form control is in the given array.
 * @param {FormControl} formControl - the form control to validate
 * @param {any[]} fieldValues - the array of values to check against
 * @returns {null | {isValid: boolean}} - null if the value is valid, or an object with a
 * isValid property that is true if the value is valid.
 */
export class SelectValidator {
  static isValid(
    formControl: FormControl,
    fieldValues: any[]
  ): null | { isValid: boolean } {
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
