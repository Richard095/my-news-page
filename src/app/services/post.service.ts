import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, IGiveReaction, Comment } from "../models/Post";
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private URI_API: string = "http://192.168.1.101:4000";
  // private URI_API: string = "http://localhost:4000";
  constructor(private httpClient: HttpClient) { }

  //Funcions for Posts
  public getPosts(category: string): Observable<Post> {
    const uri = this.URI_API + "/post";
    return this.httpClient.get(uri, { params: { category } });
  }

  public getAllPosts() {
    const uri = this.URI_API + "/post/all";
    return this.httpClient.get(uri);
  }

  public getPostById(id: string): Observable<Post> {
    const uri = this.URI_API + "/post/all";
    return this.httpClient.get(uri).pipe(
      map((response: Post) => {
        let posts: any = new Array<Post>();
        posts = response;
        let postById: Post = {};
        for (let i = 0; i < posts.posts.length; i++) {
          const post = posts.posts[i];
          if (post._id === id) {
            postById = post;
          }

        }
        return postById;
      })
    );
  }

  public addPost(formData: FormData): Observable<Post> {
    const uri = this.URI_API + "/post/";
    return this.httpClient.post(uri, formData);
  }

  public updatePost(id: string, post: Post): Observable<Post> {
    const uri = this.URI_API + "/post/" + id;
    return this.httpClient.put(uri, post);
  }

  public deletePost(id: string): Observable<any> {
    const uri = this.URI_API + "/post/" + id;
    return this.httpClient.delete(uri);
  }
  //Functions for reaction to post
  public giveReaction(reaction: IGiveReaction) {
    const uri = this.URI_API + '/post/reaction/';
    return this.httpClient.post(uri, reaction);
  }
  //Functions for comment posts
  public commentPost(comment: Comment): Observable<Comment> {
    const uri = this.URI_API + '/post/comment/';
    return this.httpClient.post(uri, comment);
  }

  public removeComment(comment: Comment) {
    const uri = this.URI_API + '/post/removecomment/';
    return this.httpClient.post(uri, comment);
  }

  public getComments(): Observable<Comment> {
    const uri = this.URI_API + '/post/comment/';
    return this.httpClient.get(uri);
  }

  //It will be changed to user service.
  public getProfile(): Observable<User> {
    const uri = this.URI_API + "/user/profile";
    return this.httpClient.get(uri);
  }

}
