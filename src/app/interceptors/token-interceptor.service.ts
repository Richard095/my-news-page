import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  token: string = "";
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("Test intercetor");
    //console.log("Paso!");

    if (this.tokenService.getToken() != null) {
      this.token = this.tokenService.getToken();
    }
    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    // }

    let headers = new HttpHeaders({
      'auth-token': this.token
    });

    const requestClone = req.clone({
      headers: headers
    });

    return next.handle(requestClone);
  }

}
