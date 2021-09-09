import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PrepareListRequestService } from '../../shared/services/prepare-list-request.service';
import { ISimpleAnimal } from '../interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalListService implements IBaseListService<ISimpleAnimal> {
  private readonly animalUrl: string = environment.apiUrl.animals;
  constructor(private http: HttpClient,
              private prepareListRequestService: PrepareListRequestService) { }


  public fetchList(customParams?: {[param: string]: string | string[]}): Observable<ISimpleAnimal[]> {
    return this.getAnimalList(customParams);
  }

  private getAnimalList(customParams?: {[param: string]: string | string[]}): Observable<ISimpleAnimal[]> {
    const url = `${this.animalUrl}`;
    const params = !!customParams ? customParams : this.prepareListRequestService.getParamsData();
    return this.http.get<Pagination<ISimpleAnimal>>(url, {params})
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.prepareListRequestService.dispatchPaginationData(paginationData)
        return items;
      }));
  }
}
