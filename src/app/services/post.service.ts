import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "../models/Post";
import { Observable } from 'rxjs';
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

}
