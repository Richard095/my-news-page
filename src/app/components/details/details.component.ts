import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post, IGiveReaction } from 'src/app/models/Post';
import { ReactextService } from 'src/app/services/reactext.service';
const uuidv4 = require('uuid/v4');
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  post: Post
  reaction: IGiveReaction;
  reactions: string | number;
  exist: boolean;
  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private reactionStorage: ReactextService) {
    this.post = { title: '', content: '', createdAt: '', images: [{ id: '', url: '' }], reactions: [{ _id: '', postedBy: '' }] }
    this.reaction = { postId: '', reactionId: '' }
  }

  ngOnInit() {
    this.verifiInvitedId();
    this.getPostById();
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
      this.exist = this.verify(this.post.reactions, this.reactionStorage.getReaction())
    }, (error) => { console.log(error) })
  }

  giveReaction() {
    this.reaction.postId = this.post._id;
    this.postService.giveReaction(this.reaction).subscribe(res => {
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
}
