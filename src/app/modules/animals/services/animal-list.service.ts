import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { Pagination } from '../../shared/interfaces/list-config.interface';
import { PaginationAndSortService } from '../../shared/services/pagination-and-sort.service';
import { ISimpleAnimal } from '../interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalListService implements IBaseListService<ISimpleAnimal> {
  private animals$ = new BehaviorSubject<ISimpleAnimal[]>([]);
  private readonly animalUrl: string = environment.apiUrl.animals;
  constructor(private http: HttpClient,
              private paginationAndSortService: PaginationAndSortService) { }

  public fetchList(): Observable<ISimpleAnimal[]> {
    if (this.emptyList()) {
      return this.getAnimalList();
    }
    return this.animals$.asObservable();
  }

  private emptyList (): boolean {
    return !this.animals$.getValue()?.length;
  }

  private getAnimalList(): Observable<ISimpleAnimal[]> {
    const url = `${this.animalUrl}`;
    return this.http.get<Pagination<ISimpleAnimal>>(url, {params: this.paginationAndSortService.getParamsData()})
      .pipe(map(data => {
        const {items, ...paginationData} = data;
        this.paginationAndSortService.dispatchPaginationData(paginationData)
        return items;
      }));
  }
}
