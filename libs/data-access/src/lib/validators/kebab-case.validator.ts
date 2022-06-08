import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A validator that checks the strength of a password.
 * @returns A validator that checks the strength of a password.
 */
export function kebabCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isKebabCase = /^[a-z][a-z-]*$/.test(value);

    return !isKebabCase ? { kebabCase: true } : null;
  };
}
