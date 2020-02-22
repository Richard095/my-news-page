import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from "..//..//../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URI_API: string = environment.URL;
  constructor(private httpClient: HttpClient) { }

  signIn(user: User): Observable<User> {
    return this.httpClient.post<User>(this.URI_API + "/auth/signin/", user)
  }

}
