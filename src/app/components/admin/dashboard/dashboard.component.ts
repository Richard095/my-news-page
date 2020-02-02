import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  user: User;
  hasHistory: boolean = false;
  constructor(private tokenService: TokenService, private router: Router, private userService: PostService) {
    this.user = { name: '', email: '' }
    this.router.navigate(['/admin/start'], { replaceUrl: true })
    this.hasHistory = this.router.navigated;

  }

  ngOnInit() {
    this.getProfile();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/home'])
  }

  getProfile() {
    this.userService.getProfile().subscribe((res: User) => {
      this.user = res;
    }, (error) => {
      console.log(error);
    });
  }
}
