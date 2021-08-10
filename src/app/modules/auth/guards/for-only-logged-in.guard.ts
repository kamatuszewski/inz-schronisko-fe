import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForOnlyLoggedInGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogged();
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot,
                          state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogged();
  }

  private isLogged(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.checkAndDispatchLocalStorage();
    return this.authService.isLogged().pipe(tap(this.redirect));
  }

  private redirect = (isLogged: boolean): void => {
    if (!isLogged) {
      this.authService.redirectToLoginPage();
    }
  }
}
