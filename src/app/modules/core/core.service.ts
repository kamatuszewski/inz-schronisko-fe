import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private pendingRequests = 0;
  constructor() { }

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

  public showLoader(): void {
    if (this.pendingRequests === 0) {
      this.isLoading$.next(true);
    }
    this.pendingRequests++;
  }
}
