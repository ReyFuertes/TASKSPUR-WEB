import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
  if (control.value.match(/^((?=.*[0-9])|(?=.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*]{8,50}$/)) {
    return { valid: true };
  }
  return null;
}