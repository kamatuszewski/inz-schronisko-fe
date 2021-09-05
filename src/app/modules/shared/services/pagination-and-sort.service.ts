import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationData, RequestListConfig, SortConfig } from '../interfaces/list-config.interface';

@Injectable({providedIn: 'root'})
export class PaginationAndSortService {
  public static defaultRequestListConfig: RequestListConfig = {
    pageNumber: 1,
    pageSize: 2
  };

  public static prepareRequest(config =
                                 PaginationAndSortService.defaultRequestListConfig): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {};
    Object.keys(config)
      .filter(key => !!config[key])
      .forEach((key , index ) => {
        params[key] = config[key];
      })
    return params;
  }

  private paginationAndSortConfig$ = new BehaviorSubject<RequestListConfig>(PaginationAndSortService.defaultRequestListConfig);
  private paginationData$ = new BehaviorSubject<PaginationData>(null);

  public dispatchPage(page: number): void {
    const allData = this.paginationAndSortConfig$.getValue();
    allData.pageNumber = page;
    this.paginationAndSortConfig$.next(allData);
  }

  public dispatchPaginationData(data: PaginationData): void {
    this.paginationData$.next(data);
  }

  public dispatchSort(data: SortConfig): void {
    const allData = this.paginationAndSortConfig$.getValue();
    const pagination = {
      pageSize: allData.pageSize,
      pageNumber: allData.pageNumber
    }

    this.paginationAndSortConfig$.next({...data, ...pagination});
  }

  public getPage(): number {
    const allData = this.paginationAndSortConfig$.getValue();
    return allData.pageNumber;
  }

  public getParamsData(): {[param: string]: string | string[]} {
    return PaginationAndSortService.prepareRequest(this.paginationAndSortConfig$.getValue());
  }

  public refreshList(): Observable<RequestListConfig> {
    return this.paginationAndSortConfig$.asObservable();
  }

  public reset(): void {
    this.paginationAndSortConfig$.next(PaginationAndSortService.defaultRequestListConfig)
  }

  public selectPaginationData(): Observable<PaginationData> {
    return this.paginationData$.asObservable();
  }
}
