import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  date = new Date();

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {

  }
  ngOnInit() {
    this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
    });

  }
  getPosts(category: string) {
    this.postService.getPosts(category).subscribe((res: any) => {
      this.posts = res.posts;
      this.posts.reverse();
      console.log(this.posts);
    }, (error) => {
      console.log(error);
    })
  }
}
