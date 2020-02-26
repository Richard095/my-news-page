import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { EmmiterService } from 'src/app/services/emmiter.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  processing: boolean = false;
  constructor(private emmiter: EmmiterService, private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.processing = true;
      } else if (event instanceof NavigationEnd) {
        this.processing = false;
      }
    })
    this.emmiter.state.subscribe(state => {
      this.processing = state;
    })
  }
}
