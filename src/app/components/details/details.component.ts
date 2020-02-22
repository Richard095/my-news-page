import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post, IGiveReaction, Comment } from 'src/app/models/Post';
import { ReactextService } from 'src/app/services/reactext.service';
import uuidv4 from 'uuid/v4';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  post: Post = {};
  reaction: IGiveReaction;
  comment: Comment;
  comments: Comment[];
  myUID: string;
  next: boolean = false;
  exist: boolean;

  constructor(private _dataService: DataService, private socketIO: Socket, private postService: PostService, private activatedRoute: ActivatedRoute, private locStorage: ReactextService) {
    this.post = { title: '', content: '', createdAt: '', category: '', images: [{ id: '', url: '' }], reactions: [{ _id: '', postedBy: '' }] }
    this.reaction = { postId: '', reactionId: '' }
    this.comment = {
      _id: '', commentedBy: '', postId: '', comment: '', commentId: '', createdAt: '',
    }
    this.verifiInvitedId();
    this.getDetailPost(this.activatedRoute.snapshot.params.id);

  }

  ngOnInit() {
    this.socketIO.connect();
    this.myUID = this.locStorage.getUserId();
    // // //Sockets
    this.socketIO.on("newreactions", (event) => {
      this.post.reactions.length = event;

    })
    this.socketIO.on("newcomment", (event) => {
      this.comments = event;
    });
    this.socketIO.on("commentremoved", (event) => {
      this.comments = event
    });
  }

  ngOnDestroy(): void {
    this.socketIO.disconnect();
  }

  getDetailPost(id: string) { //From Local storage
    const posts: Post[] = JSON.parse(this._dataService.getData());
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (post._id === id) {
        this.post = post;
        if (this.post) this.next = true;
        this.comments = this.post.comments;
        this.comments.reverse();
        this.exist = this.verify(this.post.reactions, this.locStorage.getUserId())
      } else {
        const posts: Post[] = JSON.parse(this._dataService.getDataRecommend());
        for (let j = 0; j < posts.length; j++) {
          const post = posts[j];
          if (post._id === id) {
            this.post = post;
            if (this.post) this.next = true;
            this.comments = this.post.comments;
            this.comments.reverse();
            this.exist = this.verify(this.post.reactions, this.locStorage.getUserId())
          }
        }
      }
    }
  }

  giveReaction() {
    this.reaction.postId = this.post._id;
    this.postService.giveReaction(this.reaction)
      .pipe(share())
      .subscribe((res: any) => {
        this.socketIO.emit("newreactions", res.reactions.length);
        this.exist = this.verify(res.reactions, this.locStorage.getUserId());
      }, error => { console.log(error) });
  }

  verify(reactions: Array<any>, id: string) {
    let exist = false;
    reactions.forEach(element => {
      if (id == element.postedBy) exist = true;
    });
    return exist;
  }

  //Comment post
  commentPost() {
    this.comment.postId = this.post._id;
    this.comment.commentedBy = this.locStorage.getUserId();
    this.postService.commentPost(this.comment).subscribe((res: any) => {
      this.comment.comment = '';
      this.socketIO.emit("newcomment", res.comments)
      this.socketIO.emit("newpost", "HOLAAAA")
    }, error => console.log(error));
  }

  deleteComment(_id) {
    this.comment.postId = this.post._id;
    this.comment.commentId = _id;
    delete this.comment._id;
    delete this.comment.createdAt;
    delete this.comment.comment;
    this.postService.removeComment(this.comment).subscribe((res: any) => {
      this.socketIO.emit("commentremoved", res.comments);
    }, error => console.log(error));

  }

  verifyCommentdBy(comments: Array<any>, id: string) {
    let myComment = false;
    comments.forEach(post => {
      if (id === post.commentedBy) myComment = true;
    });
    return myComment;
  }

  verifiInvitedId() {
    if (this.locStorage.getUserId() !== null) {
      this.reaction.reactionId = this.locStorage.getUserId();
    } else {
      this.reaction.reactionId = "IV-" + uuidv4();
      this.locStorage.saveUserId(this.reaction.reactionId);
    }
  }
}
