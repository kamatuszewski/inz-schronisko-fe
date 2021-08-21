import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreService } from '../../core/core.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!!this.authService.getAccessToken()?.accessToken && CoreService.isApiRequest(request)) {
      request = request.clone({
        setHeaders: {...AuthService.getAuthorizationHeaderObject(this.authService.getAccessToken())}
      })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
        }
        return throwError(err);
      })
    )
  }
}
