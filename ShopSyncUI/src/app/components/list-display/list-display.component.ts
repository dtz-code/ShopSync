import {
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlattener } from '@angular/material/tree';
import { List } from 'src/app/models/list';
import { CategoryService } from 'src/app/services/auth/assignCategory.service';
import { Item } from '../../models/item';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../dialogs/add-item-dialog/add-item-dialog.component';
import { UUID } from 'uuid-generator-ts';
import { Category } from '../../models/category';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListDisplayComponent {
  @Input() selectedList: List | undefined;
  newItem: string = '';
  newItemQuantity: number = 1;
  loggedUser: User | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private cdref: ChangeDetectorRef,
    private categoryService: CategoryService,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.authenticatedUser$.subscribe(
      (user) => {
        this.loggedUser = user;
      }
    );
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  addItem() {
    if (this.newItem != '') {
      let itemExists = this.selectedList?.checkIfItemExists(
        new Item(new UUID().toString(), this.newItem, 5)
      );
      if (itemExists === undefined) {
        const cat = this.categoryService.getCategoryForItem(this.newItem);
        if (cat != null) {
          const item: Item = new Item(
            new UUID().toString(),
            this.newItem,
            this.newItemQuantity
          );
          let added = this.selectedList?.addItem(cat, item);
          console.log(cat);
          if (added?.length != 0) {
            let displayMessage =
              'Artikel zur Kategorie ' + added + ' hinzugefügt!';
            this._snackbar.open(displayMessage, 'Kategorie ändern', {
              duration: 1000,
            });
          }
        }
        this.newItem = '';
      } else if (itemExists.id != null) {
        const dialogRef = this.dialog.open(AddItemDialogComponent, {
          data: {
            item: itemExists,
            mode: 'addExisting',
            quantity: this.newItemQuantity,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          this.newItemQuantity = 1;
          this.newItem = '';
        });
      }
    }
    this.changeListSettings();
  }

  deleteItem(item: Item, category: Category, multiDelete: boolean = false) {
    console.log(item, category);
    if (multiDelete) {
      this.selectedList?.deleteItem(category, item);
      console.log('Multi Delete');
    } else {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {
          item: item,
          category: category,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { item: item, mode: 'editExisting' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.newItemQuantity = 1;
      this.newItem = '';
    });
  }

  changeItemState(item: Item) {
    item.changeItemState();
  }

  changeListSettings() {
    const user = this.authService.getAuthenticatedUser();
    console.log('Authenticateduser:', this.loggedUser);
    const date = new Date();
    this.selectedList?.setChangeSettings(this.loggedUser, date);
    console.log(this.selectedList);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
