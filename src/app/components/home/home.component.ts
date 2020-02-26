import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, map, share } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { EmmiterService } from 'src/app/services/services/emmiter.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  date = new Date();
  postsSuggested: Post[] = new Array();
  myButton: any;
  hasposts: boolean = false;
  private _routerSub = Subscription.EMPTY;

  constructor(private emmiter: EmmiterService, private socketIO: Socket, private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
    this.posts = [{ images: [{ url: '' }] }]
    this.getPosts();
    this.emmiter.state.emit(true);
  }

  ngOnInit() {
    this.socketIO.connect();
    this.socketIO.on("newpost", (event) => { this.getPosts(); });
    this.myButton = document.getElementById("myBtn");
  }

  ngOnDestroy(): void {
    this.socketIO.disconnect();
    this._routerSub.unsubscribe()
  }

  getPosts() {
    this.activatedRoute.data
      .pipe(map((res: any) => {
        res = res.PostResolverGuard;
        for (let i = 0; i < res.posts.length; i++) {
          const post = res.posts[i];
          if (post.images.length === 0) post.images[0] = { url: '/assets/notimage.png' }
        }
        return res.posts;
      }))
      .subscribe((res: any) => {
        this.posts = res;
        this.posts.reverse();
        if (this.posts.length > 0) this.hasposts = true;
        this.recomendedPosts();
      }, (error) => console.log(error))
  }

  //Getting five posts for recommend with currently category 
  recomendedPosts() {
    this.postService.getAllPosts()
      .subscribe(async (res: any) => {
        const allposts = res.posts;
        let posts: Post[] = new Array();
        for (let i = 0; i < allposts.length; i++) {
          const post = allposts[i];
          if (post.category !== this.activatedRoute.snapshot.params.cattmpd) posts.push(post);
        }
        if (posts.length > 0) {
          this.postsSuggested = this.getRecomendedPosts(posts, 5);
          const xd = this.removeDuplicates(this.postsSuggested, 'category');
          this.postsSuggested = xd;
        }
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

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.myButton.style.display = "block";
    } else {
      this.myButton.style.display = "none";
    }
  }

}
