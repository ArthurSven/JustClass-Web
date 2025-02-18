import { Injectable } from '@angular/core';
import { AuthService} from "./auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService, private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const username = this.authService.getUsername()
    const loggedIn = this.authService.isLoggedIn()

    if(!username || !loggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    return true
  }
}
