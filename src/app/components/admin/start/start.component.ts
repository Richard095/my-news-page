import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modals/modal/modal.component';

@Component({
  selector: 'app-postlist',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  posts: Post[];
  dataSource = this.posts;
  displayedColumns: string[] = ['createdAt', 'title', '_id'];
  processing: boolean = false;
  date = new Date();
  constructor(private postService: PostService, public dialog: MatDialog) {
    this.posts = [{ createdAt: '', title: '' }]
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getProfile().subscribe((res: User) => {
      this.posts = res.posts;
      this.dataSource = this.posts;
    }, (error) => {
      console.log(error);
    })
  }

  delete(_id) {
    const dialogRef = this.dialog.open(ModalComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processing = true;
        this.postService.deletePost(_id).subscribe((res: any) => {
          this.getPosts();
          this.processing = false;
        }, (error) => {
          this.processing = false;
          console.log(error);
        })
      }
    });
  }

}
