import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { List } from 'src/app/models/list';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponentComponent {
  moment: string = '';
  userCall: string = 'Gast';
  lists: List[] = [];
  sortedLists: List[] = [];
  loggedUser: User | null = null;
  userLog: any;

  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.authenticatedUser$.subscribe(
      (user) => {
        this.loggedUser = user;
        this.userLog = user;
        this.loggedUser?.getLists().forEach((list) => {
          this.lists.push(list);
        });
        if (this.loggedUser != null) {
          this.userCall =
            this.loggedUser.prename + ' ' + this.loggedUser.surname;
        }
      }
    );
    this.checkTime();
    this.loadLastChangedLists();
  }

  loadLastChangedLists() {
    this.lists.sort((a, b) => {
      const dateA = a.lastChanged.getTime();
      const dateB = b.lastChanged.getTime();

      return dateB - dateA;
    });

    this.sortedLists = this.lists.slice(0, 3);

    console.log(this.sortedLists);
  }

  checkTime() {
    //TODO not chosing the right time
    const date = new Date();
    const hours = date.getHours();
    if (hours > 0 && hours <= 4) {
      this.moment = 'Abend';
    } else if (hours > 4 && hours <= 10) {
      this.moment = 'Morgen';
    } else if (hours >= 11 && hours <= 4) {
      this.moment = 'Mittag';
    } else if (hours >= 5 && hours <= 23) {
      this.moment = 'Abend';
    }

    if (this.loggedUser != null) {
      this.userCall = this.loggedUser.prename + ' ' + this.loggedUser.surname;
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
