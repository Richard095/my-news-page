import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  post: Post
  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.post = { title: '', content: '', createdAt: '', images: [{ id: '', url: '' }] }
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.postService.getPostById(params.id).subscribe((res: Post) => {
      this.post = res;

    }, (error) => { console.log(error) })
  }

}
