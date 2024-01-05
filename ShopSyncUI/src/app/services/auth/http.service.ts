import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private shoppingListBaseUrl: string =
    'https://localhost:44305/api/ShoppingList';

  constructor(private http: HttpClient) { }

  // postShoppingList() {
  //     this.http.post
  // }

  createUser(userName: string, passWord: string) {
    console.log('Creating user in Backend');
    const requestData = {
      username: userName,
      password: passWord,
    };
    this.http
      .post('https://localhost:44305/api/User/CreateUser', requestData)
      .subscribe(
        (response) => {
          // Erfolgreiche Antwort
          console.log('Server response:', response);
        },
        (error) => {
          // Fehler bei der Anfrage
          console.error('Fehler bei der Anfrage:', error);
        }
      );
  }
}
