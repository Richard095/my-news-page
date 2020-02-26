import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root'
})
export class DetailResolverGuard implements Resolve<Post> {

  constructor(private postService: PostService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Post | Observable<Post> | Promise<Post> {
    return this.postService.getPost(route.paramMap.get('id'));
  }
}
