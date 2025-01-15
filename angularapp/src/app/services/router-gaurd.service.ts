import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
 
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
 
  constructor(private basicAuthService: AuthService, private router: Router) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.basicAuthService.isUserLoggedIn())
      return true;
    this.router.navigate(['api/login']);
  }
}
 