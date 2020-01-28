import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginIgnoreGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) { }
  canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken() != null) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
