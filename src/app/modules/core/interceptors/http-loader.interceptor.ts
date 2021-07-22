import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CoreService } from '../core.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(private coreService: CoreService) {
  }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.coreService.showLoader();
    return next.handle(req).pipe(
      finalize(() => {
        timer(250).subscribe(() => this.coreService.hideLoader());
      })
    );
  }
}
