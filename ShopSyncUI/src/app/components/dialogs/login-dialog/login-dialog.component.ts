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

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  hidePW: boolean = true;
  hideRepeatPW: boolean = true;

  loginForm: FormGroup;

  @Output() newUserEvent = new EventEmitter<User>();

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.createRegistrationForm();
  }

  createRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(
      'abc',
      this.loginForm.get('mail')?.value,
      this.loginForm.get('password')?.value
    );
  }
}
