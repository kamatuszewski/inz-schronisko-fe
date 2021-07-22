import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_LIST_SERVICE = new InjectionToken<IBaseListService>('BASE_LIST_SERVICE')

export interface IBaseListService<T = any> {
  fetchList: () => Observable<T>;
}
