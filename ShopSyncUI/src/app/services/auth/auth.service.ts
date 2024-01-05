import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { List } from 'src/app/models/list';
import { User } from 'src/app/models/user';
import { Item } from '../../models/item';
import { UUID } from 'uuid-generator-ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedUser: User | null = null;
  private authenticatedUserSubject = new BehaviorSubject<User | null>(
    this.authenticatedUser
  );
  authenticatedUser$ = this.authenticatedUserSubject.asObservable();

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    console.log('Register...');
    const id = new UUID().toString();
    const username = firstname + lastname + id;
    const registerUser = new User(id, username, email, firstname, lastname, []);
  }

  login(username: string, email: string, password: string): boolean {
    console.log('Login...');
    if (email === 'admin' && password === 'admin') {
      const user = new User(
        '1234',
        username,
        'user@example.com',
        'Philipp',
        'Schuster',
        [
          new List(
            'Zuhause',
            [
              new Category('obst', 'Obst', [
                new Item(new UUID().toString(), 'Apfel', 5),
                new Item(new UUID().toString(), 'Banane', 2),
                new Item(new UUID().toString(), 'Kiwi', 4),
              ]),
              new Category('fleisch', 'Fleisch', [
                new Item(new UUID().toString(), 'Salami', 20),
                new Item(new UUID().toString(), 'Schinken', 2),
                new Item(new UUID().toString(), 'Lammfilet', 500),
              ]),
            ],
            [],
            new Date(),
            null
          ),
          new List(
            'WG',
            [
              new Category('getraenke', 'Getränke', [
                new Item(new UUID().toString(), 'Cola', 5),
                new Item(new UUID().toString(), 'Wasser', 2),
                new Item(new UUID().toString(), 'Sprudel', 4),
              ]),
              new Category('haushaltsgeraete', 'Haushaltsgeräte', [
                new Item(new UUID().toString(), 'Staubsauger', 5),
              ]),
            ],
            [],
            new Date(),
            null
          ),
        ]
      );
      this.authenticatedUser = user; // Aktualisiere das private Attribut
      this.authenticatedUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    console.log('Logout');
    this.authenticatedUser = null; // Setze das private Attribut auf null
    this.authenticatedUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    console.log('isAuthenticated');
    return !!this.authenticatedUser;
  }

  getAuthenticatedUser(): User | null {
    console.log('getAuthenticatedUser');
    return this.authenticatedUser;
  }
}
