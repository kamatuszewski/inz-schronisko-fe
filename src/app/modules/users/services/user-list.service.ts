import { Injectable } from '@angular/core';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { IGeneralUser } from '../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService implements IBaseListService<IGeneralUser> {
  private readonly userUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient) {}

  public fetchList(): Observable<IGeneralUser[]> {
    return this.getUserList();
  }

  private getUserList(): Observable<IGeneralUser[]> {
    return this.http.get<IGeneralUser[]>(this.userUrl);
  }
}
