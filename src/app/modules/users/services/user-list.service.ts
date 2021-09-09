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

  public fetchList(customParams?: {[param: string]: string | string[]}): Observable<IGeneralUser[]> {
    return this.getUserList(customParams);
  }

  private getUserList(customParams?: {[param: string]: string | string[]}): Observable<IGeneralUser[]> {
    const params = !!customParams ? customParams : this.prepareListRequestService.getParamsData();
    return this.http.get<Pagination<IGeneralUser>>(
      this.userUrl,
      {params}
    )
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.prepareListRequestService.dispatchPaginationData(paginationData);
        return items;
      }));
  }
}
