import { Injectable } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() {
  }

  public getProfile(token: string): IProfile {
    const tokens = token.split('.');
    if (tokens.length > 0) {
      return JSON.parse(atob(tokens[1]));
    }
    return null;
  }

}
