import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  date = new Date();
  constructor(private postService: PostService) { }
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.posts;
    }, (error) => {
      console.log(error);
    })
  }
}
