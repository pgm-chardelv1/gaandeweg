import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A validator that checks the strength of a password.
 * @returns A validator that checks the strength of a password.
 */
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    // eslint-disable-next-line no-useless-escape
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      value
    );

    const passwordIsValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;

    return !passwordIsValid ? { passwordStrength: true } : null;
  };
}
