import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PaginationAndSortService } from '../../shared/services/pagination-and-sort.service';
import { IGeneralUserListItem } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class VolunteerListService implements IBaseListService<IGeneralUserListItem> {
  private readonly userUrl = environment.apiUrl.persons;
  constructor(private http: HttpClient,
              private paginationAndSortService: PaginationAndSortService) {}

  public fetchList(): Observable<IGeneralUserListItem[]> {
    return this.getEmployeeList();
  }

  private getEmployeeList(): Observable<IGeneralUserListItem[]> {
    const url = `${this.userUrl}/Volunteers`
    return this.http.get<Pagination<IGeneralUserListItem>>(url)
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.paginationAndSortService.dispatchPaginationData(paginationData)
        return items;
      }));
  }
}
