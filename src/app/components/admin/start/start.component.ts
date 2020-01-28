import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { error } from 'protractor';
import { Post } from 'src/app/models/Post';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },

];

@Component({
  selector: 'app-postlist',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  posts: Post[];
  dataSource = this.posts;
  constructor(private postService: PostService) {
    this.posts = [
      {
        createdAt: '',
        title: ''
      }
    ]
  }

  ngOnInit() {
    this.getPosts();
  }
  displayedColumns: string[] = ['createdAt', 'title', '_id'];

  getPosts() {
    this.postService.getProfile().subscribe((res: User) => {
      this.posts = res.posts;
      console.log(this.posts);
      this.dataSource = this.posts;
    }, (error) => {
      console.log(error);
    })
  }

  delete(post, p) {
    console.log(post, p);
  }

}
