import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']

})
export class NavegationComponent implements OnInit {
  userIsLogin: boolean = false;

  constructor(
    private router: Router,
    private tokenService: TokenService) {
    if (this.tokenService.getToken() !== null) {
      this.userIsLogin = true;
    }
  }

  ngOnInit() {

  }
  admin() {
    this.router.navigate(['/admin/start'], { replaceUrl: false })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 150) {
      let element = document.getElementById('myTopnav');
      element.classList.add('sticky');
    } else {
      let element = document.getElementById('myTopnav');
      element.classList.remove('sticky');
    }
  }

}
