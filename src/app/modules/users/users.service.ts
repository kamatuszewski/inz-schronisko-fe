import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISimplePayload } from '../animals/interfaces/animals.interface';
import { IUpdateUserForm, IUserForm } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient) { }

  public createUser(payload: IUserForm): Observable<unknown> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, payload);
  }

  public getUser(payload: ISimplePayload): Observable<IUserForm> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.get<IUserForm>(url);
  }

  public updateUser(payload: IUpdateUserForm): Observable<unknown> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.put(url, payload);
  }
}
