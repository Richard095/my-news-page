import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminStartRedirectGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {

  }
  canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken() != null) { //Si esta logueado
      this.router.navigate(['/admin/start']);
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

}
