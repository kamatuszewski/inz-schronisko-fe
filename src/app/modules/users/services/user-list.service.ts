import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PaginationAndSortService } from '../../shared/services/pagination-and-sort.service';
import { IGeneralUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService implements IBaseListService<IGeneralUser> {
  private readonly userUrl = environment.apiUrl.persons;

  constructor(private http: HttpClient,
              private paginationAndSortService: PaginationAndSortService) {
  }

  public fetchList(): Observable<IGeneralUser[]> {
    return this.getUserList();
  }

  private getUserList(): Observable<IGeneralUser[]> {
    return this.http.get<Pagination<IGeneralUser>>(this.userUrl)
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.paginationAndSortService.dispatchPaginationData(paginationData);
        return items;
      }));
  }
}
