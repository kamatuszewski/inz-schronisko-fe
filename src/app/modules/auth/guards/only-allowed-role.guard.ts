import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { permissionsMap, EOperation } from '../../core/commons/permissions.common';
import { CoreService } from '../../core/core.service';
import { AuthService } from '../auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class OnlyAllowedRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private coreService: CoreService, private translocoService: TranslocoService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const operation = route?.data?.operation as EOperation;
    if (!operation || !permissionsMap.has(operation)) {
      return true;
    }

    const hasAccess = this.authService.hasSomeAllowedRole(...permissionsMap.get(operation));

    if (hasAccess) {
      return true;
    }
    this.coreService.showWarningMessage('Nie masz uprawnień do tej części aplikacji');
    this.router.navigate(['animals']).then();
    return false;
  }
}
