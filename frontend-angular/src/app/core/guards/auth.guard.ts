import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.authService.isAuthenticated;
    console.log('AuthGuard: Checking authentication:', isAuth, 'Token:', !!this.authService.tokenValue, 'User:', !!this.authService.currentUserValue);
    
    if (isAuth) {
      return true;
    }

    // Not authenticated, redirect to login
    console.log('AuthGuard: Not authenticated, redirecting to login');
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
