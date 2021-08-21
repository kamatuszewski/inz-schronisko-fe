import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISimplePayload } from '../animals/interfaces/animals.interface';
import { IEmployee, IUpdateUserForm, IUserForm, IUserRemoveRoleForm, IUserRoleForm, IVolunteer } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient) { }

  public addRoleToUser(userId: number, payload: IUserRoleForm): Observable<unknown> {
    const url = `${this.baseUrl}/${userId}/role`;
    return this.http.post(url, payload);
  }

  public createUser(payload: IUserForm): Observable<unknown> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, payload);
  }

  public getEmployee(payload: ISimplePayload): Observable<IEmployee> {
    const url = `${this.baseUrl}/Employees/${payload.id}`;
    return this.http.get<IEmployee>(url);
  }

  public getUser(payload: ISimplePayload): Observable<IUserForm> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.get<IUserForm>(url);
  }

  public getVolunteer(payload: ISimplePayload): Observable<IVolunteer> {
    const url = `${this.baseUrl}/Volunteers/${payload.id}`;
    return this.http.get<IVolunteer>(url);
  }

  public removeRoleFromUser(payload: IUserRemoveRoleForm, userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}/role`;
    let params;
    if (payload.quitDate) {
      params = new HttpParams().set('roleId', `${payload.roleId}`).append('quitDate', payload.quitDate);
    } else {
      params = new HttpParams().set('roleId', `${payload.roleId}`);
    }
    return this.http.delete(url, {params});
  }

  public updateUser(payload: IUpdateUserForm): Observable<unknown> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.put(url, payload);
  }
}
