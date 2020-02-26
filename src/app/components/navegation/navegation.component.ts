import { Component, OnInit, HostListener, Inject, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { EmmiterService } from 'src/app/services/services/emmiter.service';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']

})
export class NavegationComponent implements OnInit {

  userIsLogin: boolean = false;
  show: boolean = true;
  constructor(
    private emmiter: EmmiterService,
    private router: Router,
    private tokenService: TokenService, private activateRoute: ActivatedRoute) {
    if (this.tokenService.getToken() !== null) this.userIsLogin = true;
  }
  ngOnInit() {
    this.emmiter.state.subscribe(state => { this.show = state; })
  }

  admin() {
    this.router.navigate(['/admin/start'], { replaceUrl: false });
    this.show = false;
  }

}
