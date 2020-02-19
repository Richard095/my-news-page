import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  totalComments: number = 0;
  totalReactions: number = 0;
  constructor(private userService: PostService) {
    this.user = { name: '', email: '', posts: [{ comments: [{}] }] }
  }
  ngOnInit() {
    this.userService.getProfile().subscribe((res: User) => {
      this.user = res;
      for (let i = 0; i < this.user.posts.length; i++) {
        const post = this.user.posts[i];
        this.totalComments = this.totalComments + post.comments.length;
        this.totalReactions = this.totalReactions + post.reactions.length;
      }
    }, (error) => console.log(error));

  }

}
