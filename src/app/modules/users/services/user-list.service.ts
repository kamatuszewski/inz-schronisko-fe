import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PrepareListRequestService } from '../../shared/services/prepare-list-request.service';
import { IGeneralUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService implements IBaseListService<IGeneralUser> {
  private readonly userUrl = environment.apiUrl.persons;

  constructor(private http: HttpClient,
              private prepareListRequestService: PrepareListRequestService) {
  }

  public fetchList(): Observable<IGeneralUser[]> {
    return this.getUserList();
  }

  private getUserList(): Observable<IGeneralUser[]> {
    return this.http.get<Pagination<IGeneralUser>>(this.userUrl)
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.prepareListRequestService.dispatchPaginationData(paginationData);
        return items;
      }));
  }
}
