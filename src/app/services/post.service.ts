import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, IGiveReaction } from "../models/Post";
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
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

  public getPostById(id: string): Observable<Post> {
    const uri = this.URI_API + "/post";
    return this.httpClient.get(uri).pipe(map((res: Post) => {
      let all: any = new Array<Post>();
      all = res;
      let postById: Post = {};
      for (let i = 0; i < all.posts.length; i++) {
        const post = all.posts[i];
        if (post._id === id) {
          postById = post;
        }
      }
      return postById;
    }));
  }

  public deletePost(id: string): Observable<any> {
    const uri = this.URI_API + "/post/" + id;
    return this.httpClient.delete(uri);
  }

  public addPost(formData: FormData): Observable<Post> {
    const uri = this.URI_API + "/post/";
    return this.httpClient.post(uri, formData);
  }

  public updatePost(id: string, post: Post): Observable<Post> {
    const uri = this.URI_API + "/post/" + id;
    console.log(uri);
    return this.httpClient.put(uri, post);
  }

  public giveReaction(reaction: IGiveReaction) {
    const uri = 'http://localhost:4000/post/reaction/';
    return this.httpClient.post(uri, reaction);
  }

  //It will be changed to user service.
  public getProfile(): Observable<User> {
    const uri = this.URI_API + "/user/profile";
    return this.httpClient.get(uri);
  }

}
