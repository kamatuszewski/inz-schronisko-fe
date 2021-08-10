import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IAccessToken } from './interfaces/access-token.interface';
import { ILoginRequest } from './interfaces/login-request.interface';
import { IProfile } from './interfaces/profile.interface';
import { JwtTokenService } from './services/jwt-token.service';
import { AccessToken } from './types/token.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly ACCESS_TOKEN = 'SHELTER_ACCESS_TOKEN';
  private static readonly ACCESS_TOKEN_TYPE = 'SHELTER_ACCESS_TOKEN_TYPE';
  private accessTokenSubject$ = new BehaviorSubject<IAccessToken>(null);
  private baseUrl = environment.apiUrl.persons;
  private profileSubject$ = new BehaviorSubject<IProfile>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jwtTokenService: JwtTokenService,
  ) {
  }

  public checkAndDispatchLocalStorage(): void {
    const accessToken = localStorage.getItem(AuthService.ACCESS_TOKEN);
    const tokenType = localStorage.getItem(AuthService.ACCESS_TOKEN_TYPE);
    if (accessToken && tokenType) {
      this.dispatchAccessToken({
        accessToken, tokenType
      })
    }
  }

  public dispatchAccessToken(accessToken: IAccessToken): void {
    this.accessTokenSubject$.next(accessToken);
    this.dispatchProfile(this.jwtTokenService.getProfile(accessToken.accessToken));
  }

  public dispatchProfile(profile: IProfile): void {
    this.profileSubject$.next(profile);
  }

  public getAccessToken(): IAccessToken {
    return this.accessTokenSubject$.getValue();
  }

  public getProfile(): IProfile {
    return this.profileSubject$.getValue();
  }

  public isLogged(): Observable<boolean> {
    return this.selectAccessToken().pipe(map(access => !!access?.accessToken));
  }

  public login(payload: ILoginRequest): Observable<IAccessToken> {
    const http = `${this.baseUrl}/login`;
    return this.httpClient.post<IAccessToken>(http, payload)
      .pipe(tap(this.doOperationsAfterLogin));
  }

  public redirectToHomePage(): void {
    this.router.navigate(['animals'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public redirectToLoginPage = (): void => {
    this.router.navigate(['auth', 'login']).then();
  };

  public selectAccessToken(): Observable<IAccessToken> {
    return this.accessTokenSubject$.asObservable();
  }

  public selectProfile(): Observable<IProfile> {
    return this.profileSubject$.asObservable();
  }

  private doOperationsAfterLogin = (response: IAccessToken): void => {
    this.dispatchAccessToken(response);
    this.setSession(response);
    this.redirectToHomePage();
  };

  private setSession(accessToken: IAccessToken): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, accessToken.accessToken);
    localStorage.setItem(AuthService.ACCESS_TOKEN_TYPE, accessToken.tokenType);
  }
}
