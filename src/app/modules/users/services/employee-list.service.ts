import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PrepareListRequestService } from '../../shared/services/prepare-list-request.service';
import { IGeneralUser, IGeneralUserListItem } from '../interfaces/user.interface';
import { UserMapperService } from './user-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService implements IBaseListService<IGeneralUserListItem> {
  private readonly userUrl = environment.apiUrl.persons;

  constructor(private http: HttpClient,
              private prepareListRequestService: PrepareListRequestService) {
  }

  public fetchList(): Observable<IGeneralUserListItem[]> {
    return this.getEmployeeList();
  }

  private getEmployeeList(): Observable<IGeneralUserListItem[]> {
    const url = `${this.userUrl}/Employees`;
    return this.http.get<Pagination<IGeneralUser>>(url).pipe(
      map(data => {
        const {items, ...paginationData} = data;
        this.prepareListRequestService.dispatchPaginationData(paginationData);
        return items;
      }),
      map(UserMapperService.generalUsersToGeneralUserListMap)
    );
  }
}
