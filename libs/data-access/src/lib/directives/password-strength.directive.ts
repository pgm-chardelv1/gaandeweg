import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

/**
 * A custom validator that checks the strength of a password.
 * @returns A ValidationErrors object if the password is not strong enough.
 */
@Directive({
  selector: '[gaandewegWsPasswordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}
