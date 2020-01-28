import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API: "http://localhost:4000"
  constructor(private httpClient: HttpClient) {
  }

  signIn(user: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost:4000/auth/signin/", user)
  }

}
