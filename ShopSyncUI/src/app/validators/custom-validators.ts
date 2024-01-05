import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (password === repeatPassword) {
      return null; // Valid
    } else {
      return { passwordMismatch: true }; // Invalid
    }
  }
}
