import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { CustomValidators } from 'src/app/validators/custom-validators';

import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/auth/http.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
})
export class RegistrationDialogComponent {
  hidePW: boolean = true;
  hideRepeatPW: boolean = true;

  registrationForm: FormGroup;

  @Output() newUserEvent = new EventEmitter<User>();

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.registrationForm = this.createRegistrationForm();
  }

  createRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      prename: ['', Validators.required],
      surname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.registerUser();
    // this.authService.login('admin', 'admin', 'admin');
  }

  registerUser() {
    console.log(
      'User registered with following data: ',
      this.registrationForm.value
    );
    this.httpService.createUser(
      this.registrationForm.get('mail')?.value,
      this.registrationForm.get('password')?.value
    );
  }

  isFormValid(): boolean {
    if (
      this.registrationForm.get('password')?.value ===
      this.registrationForm.get('repeatPassword')?.value
    ) {
      return this.registrationForm.valid;
    }
    return false;
  }
}
