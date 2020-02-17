import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Post, Comment } from 'src/app/models/Post';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.scss'],

})
export class DetailpostComponent implements OnInit, AfterViewInit {

  _id: string;
  post: Post;
  comment: Comment;
  numReactions: string | number;

  constructor(private postService: PostService, public dialogRef: MatDialogRef<DetailpostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { _id, commentId }) {
    this.post = { content: '', category: '' }
    this.comment = { comment: '', createdAt: '' }

  }

  ngOnInit() {
    this._id = this.data._id;
    this.getPost();

  }
  onNoClick(): void {
    this.dialogRef.close("Closed");
  }

  getPost() {

    this.postService.getPostById(this._id).subscribe((res: Post) => {
      this.post = res;
      if (this.post.images.length === 0) {
        this.post.images[0] = { url: 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available_1481220154.png' }
      }
      const comments: any = this.post.comments;
      this.numReactions = this.post.reactions.length;
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment._id) {
          this.comment = comment;
        }
      }

    })
  }

  ngAfterViewInit(): void {
    //window.scrollTo(0, 0)
  }
  click() {
    console.log("sldfklsj");

    document.documentElement.scrollTo(0, 0);
  }
}
