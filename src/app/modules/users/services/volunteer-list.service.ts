import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { IGeneralUserListItem } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class VolunteerListService implements IBaseListService<IGeneralUserListItem> {
  private readonly userUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient) {}

  public fetchList(): Observable<IGeneralUserListItem[]> {
    return this.getEmployeeList();
  }

  private getEmployeeList(): Observable<IGeneralUserListItem[]> {
    const url = `${this.userUrl}/Volunteers`
    return this.http.get<IGeneralUserListItem[]>(url);
  }
}
