import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IAccessToken } from './interfaces/access-token.interface';
import { ILoginRequest } from './interfaces/login-request.interface';
import { ILoginResponse } from './interfaces/login-response.interface';
import { JwtTokenService } from './services/jwt-token.service';
import { IProfile } from './interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenSubject$ = new BehaviorSubject<IAccessToken>(null);
  private baseUrl = environment.apiUrl.auth;
  private profileSubject$ = new BehaviorSubject<IProfile>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jwtTokenService: JwtTokenService,
  ) { }

  public dispatchAccessToken(accessToken: IAccessToken): void {
    this.accessTokenSubject$.next(accessToken);
    this.dispatchProfile(this.jwtTokenService.getProfile(accessToken.accessToken))
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

  public login(payload: ILoginRequest): Observable<ILoginResponse> {
    const http = `${this.baseUrl}/login`;
    return this.httpClient.post<ILoginResponse>(http, payload)
      .pipe(tap(this.doOperationsAfterLogin));
  }

  public selectAccessToken(): Observable<IAccessToken> {
    return this.accessTokenSubject$.asObservable();
  }

  public selectProfile(): Observable<IProfile> {
    return this.profileSubject$.asObservable();
  }

  private doOperationsAfterLogin = (response: ILoginResponse): void => {
    this.dispatchAccessToken(response);
    this.redirectToHomePage();
  }

  private redirectToHomePage(): void {
    this.router.navigate(['manage'], {
      relativeTo: this.activatedRoute
    }).then();
  }
}
