import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API: "http://localhost:4000"
  constructor(private httpClient: HttpClient) { }

  signIn(user: User): Observable<User> {
    return this.httpClient.post<User>("http://192.168.1.101:4000/auth/signin/", user)
  }

}
