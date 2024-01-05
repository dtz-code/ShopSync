import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuComponent } from './components/top-menu/top-menu/top-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationDialogComponent } from './components/top-menu/registration-dialog/registration-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { MatMenuModule } from '@angular/material/menu';
import { ListsViewComponent } from './components/lists-view/lists-view.component';
import { ListDisplayComponent } from './components/list-display/list-display.component';

import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { AddItemDialogComponent } from './components/dialogs/add-item-dialog/add-item-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

import { MatBadgeModule } from '@angular/material/badge';

import { MatTableModule } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { HomeComponentComponent } from './components/home-component/home-component/home-component.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { GeolocatingComponent } from './components/geolocating/geolocating.component';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    RegistrationDialogComponent,
    ListsViewComponent,
    ListDisplayComponent,
    AddItemDialogComponent,
    DeleteDialogComponent,
    HomeComponentComponent,
    AppContainerComponent,
    LoginDialogComponent,
    GeolocatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatTreeModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    HttpClientModule,
    MatExpansionModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
