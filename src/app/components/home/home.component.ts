import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, map, share } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { DataService } from 'src/app/services/data/data.service';
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

  constructor(private _dataService: DataService, private socketIO: Socket, private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
    this.posts = [{ images: [{ url: '' }] }]
    this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
  }

  ngOnInit() {
    this.socketIO.connect();
    //socket
    this.socketIO.on("newpost", (event) => {
      this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
    });

    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getPosts(this.activatedRoute.snapshot.params.cattmpd);
      });

    this.myButton = document.getElementById("myBtn");
  }

  ngOnDestroy(): void {
    this.socketIO.disconnect();
  }

  getPosts(category: string) {
    this.postService.getPosts(category)
      .pipe(map((res: any) => {
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
        if (this._dataService.getData() !== null) this._dataService.removeData();
        this._dataService.saveData(JSON.stringify(this.posts))

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
          //console.log(this.postsSuggested);
          if (this._dataService.getDataRecommend() !== null) this._dataService.removeDataRecommend();
          this._dataService.saveDataRecommend(JSON.stringify(this.postsSuggested));
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
