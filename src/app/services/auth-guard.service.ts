import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if(this.authService.isLoggedIn()) return true;

    this.router.navigate(['/auth/signin'], { queryParams: { redirect: state.url } });
    return false;
  }
}
