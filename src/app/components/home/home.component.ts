import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  date = new Date();

  constructor(private postService: PostService, private router: Router) { }
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.posts;
      this.posts.reverse();
    }, (error) => {
      console.log(error);
    })
  }

  detail(evt) {
    console.log(evt);

  }
}
