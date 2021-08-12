import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { IGeneralUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService implements IBaseListService<IGeneralUser> {
  private readonly userUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient) {}

  public fetchList(): Observable<IGeneralUser[]> {
    return this.getUserList();
  }

  private getUserList(): Observable<IGeneralUser[]> {
    const url = `${this.userUrl}/Employees`
    return this.http.get<IGeneralUser[]>(url);
  }
}
