import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForOnlyNotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isNotLoggedIn();
  }

  private isNotLoggedIn(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.checkAndDispatchLocalStorage();
    return this.authService.isLogged().pipe(map((isLogged) => !isLogged), tap(this.redirect));
  }

  private redirect = (isLogged: boolean): void => {
    if (!isLogged) {
      this.authService.redirectToHomePage();
    }
  }
}
