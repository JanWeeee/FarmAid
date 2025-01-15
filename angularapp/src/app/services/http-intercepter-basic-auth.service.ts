import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
 
  constructor(private authService: AuthService) { }
 
  intercept(request: HttpRequest<any>, next: HttpHandler) {
 
    let basicAuthHeaderString = this.authService.getAuthenticatedToken();
    let email = this.authService.getAuthenticatedEmail();
    if (basicAuthHeaderString && email) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }
    console.log(JSON.stringify(request));
    return next.handle(request);
  }
}