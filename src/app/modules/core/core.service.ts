import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EApiUrl } from '../../../environments/api-url.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public static isApiRequest(request: HttpRequest<unknown>): boolean {
    const environments = Object.values(EApiUrl).map(env => environment.apiUrl[env]);
    return environments.some(env => request.url.startsWith(env));
  }

  private isLoading$ = new BehaviorSubject<boolean>(false);
  private pendingRequests = 0;
  constructor(private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private router: Router) { }

  public hideLoader(): void {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    if (this.pendingRequests < 1) {
      this.isLoading$.next(false);
    }
  }

  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable().pipe(delay(0));
  }

  public reloadComponent = (): void => {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  public showErrorMessage(message: string): void {
    this.toastrService.error(this.translocoService.translate(message));
  }

  public showLoader(): void {
    if (this.pendingRequests === 0) {
      this.isLoading$.next(true);
    }
    this.pendingRequests++;
  }

  public showSuccessMessage(message: string): void {
    this.toastrService.success(this.translocoService.translate(message));
  }

  public showWarningMessage(message: string): void {
    this.toastrService.warning(this.translocoService.translate(message));
  }
}
