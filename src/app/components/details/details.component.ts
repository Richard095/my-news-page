import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post, IGiveReaction, Comment } from 'src/app/models/Post';
import { ReactextService } from 'src/app/services/reactext.service';
import uuidv4 from 'uuid/v4';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  post: Post
  reaction: IGiveReaction;
  comment: Comment;
  comments: Comment[];
  myUID: string;
  reactions: string | number;
  exist: boolean;
  constructor(private socketIO: Socket, private postService: PostService, private activatedRoute: ActivatedRoute, private reactionStorage: ReactextService) {
    this.post = { title: '', content: '', createdAt: '', category: '', images: [{ id: '', url: '' }], reactions: [{ _id: '', postedBy: '' }] }
    this.reaction = { postId: '', reactionId: '' }
    this.comment = {
      _id: '', commentedBy: '', postId: '', comment: '', commentId: '', createdAt: '',
    }
  }

  ngOnInit() {
    this.socketIO.connect();
    this.verifiInvitedId();
    this.getPostById();
    this.myUID = this.reactionStorage.getReaction();
    //Sockets
    this.socketIO.on("newreactions", (event) => { this.getPostById(); })
    this.socketIO.on("newcomment", (event) => { this.getPostById(); });
    this.socketIO.on("commentremoved", (event) => { this.getPostById(); });

  }

  ngOnDestroy(): void {
    this.socketIO.disconnect();
  }

  verifiInvitedId() {
    if (this.reactionStorage.getReaction() !== null) {
      this.reaction.reactionId = this.reactionStorage.getReaction();
    } else {
      this.reaction.reactionId = "IV-" + uuidv4();
      this.reactionStorage.saveReaction(this.reaction.reactionId);
    }
  }

  getPostById() {
    const params = this.activatedRoute.snapshot.params;

    this.postService.getPostById(params.id).subscribe((res: Post) => {
      this.post = res;
      this.reactions = this.post.reactions.length;
      this.comments = this.post.comments;
      this.comments.reverse();

      this.exist = this.verify(this.post.reactions, this.reactionStorage.getReaction())
    }, (error) => {

      console.log(error)
    })
  }

  giveReaction() {
    this.reaction.postId = this.post._id;
    this.postService.giveReaction(this.reaction).subscribe(res => {
      this.socketIO.emit("newreactions", "reaction")
      this.getPostById();
    }, error => { console.log(error) })
  }
  verify(reactions: Array<any>, id: string) {
    let exist = false;
    reactions.forEach(element => {
      const postedBy = element.postedBy;
      if (id == postedBy) {
        exist = true;
      }
    });
    return exist;
  }

  //Comment post

  commentPost() {
    console.log(this.post);
    this.comment.postId = this.post._id;
    this.comment.commentedBy = this.reactionStorage.getReaction();

    console.log(this.post);

    this.postService.commentPost(this.comment).subscribe((res: any) => {
      this.comment.comment = '';
      this.socketIO.emit("newcomment", "comment")
    }, error => console.log(error));
  }

  deleteComment(_id) {
    this.comment.postId = this.post._id;
    this.comment.commentId = _id;
    delete this.comment._id;
    delete this.comment.createdAt;
    delete this.comment.comment;

    this.postService.removeComment(this.comment).subscribe((res: any) => {
      this.socketIO.emit("commentremoved", "comment");
    }, error => console.log(error));

  }

  verifyCommentdBy(comments: Array<any>, id: string) {
    let myComment = false;

    comments.forEach(element => {
      const postedBy = element.commentedBy;
      if (id == postedBy) {
        myComment = true;
      }
    });
    return myComment;
  }
}
