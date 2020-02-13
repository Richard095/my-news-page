import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  date = new Date();
  postsSuggested: Post[] = new Array();

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
    this.posts = [{ images: [{ url: '' }] }]
  }

  ngOnInit() {
    this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
    });

  }

  //Get all posts by category
  getPosts(category: string) {
    this.postService.getPosts(category)
      .pipe(map((res: any) => {
        for (let i = 0; i < res.posts.length; i++) {
          const post = res.posts[i];
          if (post.images.length === 0) {
            post.images[0] = { url: 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available_1481220154.png' }
          }
        }
        return res;
      }))
      .subscribe((res: any) => {
        this.posts = res.posts;
        this.posts.reverse();
        this.recomendedPosts();

      }, (error) => {
        //console.log(error);
      })
  }

  //Getting 5 posts for recommend with currently category 
  recomendedPosts() {
    this.postService.getAllPosts()
      .subscribe(async (res: any) => {
        const allposts = res.posts;
        let posts: Post[] = new Array();
        for (let i = 0; i < allposts.length; i++) {
          const post = allposts[i];
          if (post.category !== this.activatedRoute.snapshot.params.cattmpd) {
            posts.push(post);
          }
        }
        this.postsSuggested = this.getRecomendedPosts(posts, 5);
        const xd = this.removeDuplicates(this.postsSuggested, 'category');
        this.postsSuggested = xd;
      })

  }

  getRecomendedPosts(posts, numPosts) {
    var result = [];
    for (var i = 0; i < numPosts; i++) {
      result.push(posts[Math.floor(Math.random() * posts.length)]);
    }
    return result;
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

}
