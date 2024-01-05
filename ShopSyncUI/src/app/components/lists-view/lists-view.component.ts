import { Component, ViewChild } from '@angular/core';
import { List } from 'src/app/models/list';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-lists-view',
  templateUrl: './lists-view.component.html',
  styleUrls: ['./lists-view.component.scss'],
})
export class ListsViewComponent {
  lists: List[] = [];
  loggedUser: User | null = null;
  userLog: any;
  tabGroupIndex: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticatedUser$.subscribe((user) => {
      this.loggedUser = user;
      this.userLog = user;
      this.loggedUser?.getLists().forEach((list) => {
        this.lists.push(list);
      });
    });
  }

  @ViewChild('demo3Tab', { static: false }) demo3Tab: MatTabGroup | undefined;

  public demo3BtnClick() {
    this.addTab(false);
    const tabGroup = this.demo3Tab;
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    const tabCount = tabGroup._tabs.length;
    this.tabGroupIndex = 1;
  }

  addTab(selectAfterAdding: boolean) {
    let userId: User | null = this.loggedUser;
    if (this.userLog) {
      this.lists.push(
        new List('Neue Liste', [], [this.userLog], new Date(), this.userLog)
      );
    }
  }

  removeTab(index: number) {
    // this.tabs.splice(index, 1);
  }
}
