import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterConfig, PaginationData, RequestListConfig, SortConfig } from '../interfaces/list-config.interface';

@Injectable({providedIn: 'root'})
export class PrepareListRequestService {
  public static defaultRequestListConfig: RequestListConfig = {
    pageNumber: 1,
    pageSize: 10
  };

  public static prepareFilterRequest(config: FilterConfig = {}): {[param: string]: string | string[]} {
    return this.prepareRequest(config);
  }

  public static preparePaginationAndSortRequest(config =
                                 PrepareListRequestService.defaultRequestListConfig): {[param: string]: string | string[]} {
    return this.prepareRequest(config);
  }

  private static prepareRequest(config: any): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {};
    Object.keys(config)
      .filter(key => !!config[key])
      .forEach((key , index ) => {
        params[key] = config[key];
      })
    return params;
  }

  private filter$ = new BehaviorSubject<FilterConfig>({});
  private paginationAndSortConfig$ = new BehaviorSubject<RequestListConfig>(PrepareListRequestService.defaultRequestListConfig);
  private paginationData$ = new BehaviorSubject<PaginationData>(null);

  public dispatchFilter(filter: FilterConfig): void {
    this.filter$.next(filter);
  }

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
    return {
      ...PrepareListRequestService.preparePaginationAndSortRequest(this.paginationAndSortConfig$.getValue()),
      ...PrepareListRequestService.prepareFilterRequest(this.filter$.getValue())
    };
  }

  public refreshList(): Observable<RequestListConfig> {
    return this.paginationAndSortConfig$.asObservable();
  }

  public reset(): void {
    this.paginationAndSortConfig$.next(PrepareListRequestService.defaultRequestListConfig)
  }

  public resetFilter(): void {
    this.filter$.next({});
  }

  public selectFilter(): Observable<FilterConfig> {
    return this.filter$.asObservable();
  }

  public selectPaginationData(): Observable<PaginationData> {
    return this.paginationData$.asObservable();
  }
}
