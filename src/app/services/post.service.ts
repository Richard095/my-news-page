import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "../models/Post";
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  URI_API: string = "http://localhost:4000";

  constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<Post> {
    const uri = this.URI_API + "/post";
    return this.httpClient.get(uri);
  }

  public getProfile(): Observable<User> {
    const uri = this.URI_API + "/user/profile";
    return this.httpClient.get(uri);
  }

  public deletePost(id): Observable<any> {
    const uri = this.URI_API + "/post/" + id;
    return this.httpClient.delete(uri);
  }

  public addPost(formData: FormData): Observable<Post> {

    const uri = this.URI_API + "/post/";
    return this.httpClient.post(uri, formData);
  }

}
