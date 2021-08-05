import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private pendingRequests = 0;
  constructor(private toastrService: ToastrService,
              private translocoService: TranslocoService) { }

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

  public showErrorMessage(message: string): void {
    this.toastrService.warning(this.translocoService.translate(message));
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
