import { Component, Input } from '@angular/core';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
  loggedIn: boolean = false;

  loggedUser: User | null = null;

  constructor(
    private registrationDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authenticatedUser$.subscribe((user) => {
      this.loggedUser = user;
    });
  }

  openRegistrationDialog() {
    const dialogRef = this.registrationDialog.open(
      RegistrationDialogComponent,
      {
        data: {},
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  openLoginDialog() {
    const dialogRef = this.registrationDialog.open(LoginDialogComponent, {
      data: {},
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  logout() {
    this.authService.logout();
  }
}
