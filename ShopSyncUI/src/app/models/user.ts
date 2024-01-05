import { List } from './list';

export class User {
  id: string;
  username: string;
  email: string;
  prename: string;
  surname: string;
  lists: List[];

  constructor(
    id: string,
    username: string,
    email: string,
    prename: string,
    surname: string,
    lists: List[]
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.prename = prename;
    this.surname = surname;
    this.lists = lists;
  }

  getLists() {
    return this.lists;
  }
}
