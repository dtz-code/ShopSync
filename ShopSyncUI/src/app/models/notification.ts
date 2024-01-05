import { UUID } from 'uuid-generator-ts';
import { User } from './user';

export class Notification {
  notificationSeen: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  user: User | undefined;
  notificationId: string = UUID.toString();

  constructor(
    notificationTitle: string,
    notificationMessage: string,
    user: User
  ) {
    this.notificationSeen = false;
    this.notificationTitle = notificationTitle;
    this.notificationMessage = notificationMessage;
    this.user = user;
  }
}
