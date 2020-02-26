import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modals/modal/modal.component';
import { Socket } from 'ngx-socket-io';
import { DetailpostComponent } from '../../modals/detailpost/detailpost.component';
import { EmmiterService } from 'src/app/services/emmiter.service';
@Component({
  selector: 'app-postlist',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  posts: Post[];
  comments: Comment[];
  dataSource = this.posts;
  displayedColumns: string[] = ['createdAt', 'title', '_id'];
  processing: boolean = false;
  date = new Date();
  constructor(private emmiter: EmmiterService, private socketIO: Socket, private postService: PostService, public dialog: MatDialog) {
    this.posts = [{ createdAt: '', title: '' }]
    this.emmiter.state.emit(false);
  }

  ngOnInit() {
    this.socketIO.connect();
    this.getPosts();
    this.getComments()
    this.socketIO.on("newcomment", (event) => { this.getComments() });
    this.socketIO.on("commentremoved", (event) => { this.getComments(); });

  }

  getPosts() {
    this.postService.getProfile().subscribe((res: User) => {
      this.posts = res.posts;
      this.dataSource = this.posts;
      this.posts.reverse();
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

  getComments() {
    this.postService.getComments().subscribe((res: any) => {
      this.comments = res;
      this.comments.reverse();
    }, (error) => console.log(error))
  }

  previewPostCommented(_id, commentId) {
    const dialogRef = this.dialog.open(
      DetailpostComponent,
      {
        width: '80%',
        height: '80%',
        data: { _id: _id, commentId: commentId },
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
