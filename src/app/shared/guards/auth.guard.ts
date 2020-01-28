import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userIsLogin: boolean = false;

  constructor(private router: Router, private tokenService: TokenService) { }
  canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.getToken() != null) {
      this.userIsLogin = true;
    } else {
      this.userIsLogin = false;
    }
    if (this.userIsLogin) {
      return true;
    } else if (!this.userIsLogin) {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
