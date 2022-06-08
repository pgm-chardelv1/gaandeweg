import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function templateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.toLower();

    if (!value) {
      return null;
    }

    function isJson(str: string): boolean {
      try {
        return !!JSON.parse(str);
      } catch (e) {
        return false;
      }
    }

    const isJsonString = isJson(value);

    return !isJsonString ? { template: true } : null;
  };
}
