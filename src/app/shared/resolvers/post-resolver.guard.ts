import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostResolverGuard implements Resolve<Post[]> {
  constructor(private postService: PostService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.postService.getPosts(route.paramMap.get("cattmpd")).pipe(take(1))
  }
}
