import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { IBaseListService } from '../interfaces/base-list-service.interface';

@Injectable()
export class BaseListService implements IBaseListService {
  public fetchList(): Observable<any> {
    console.warn('You are using the default class. If you want to use it, implement a new class for new needs.')
    return EMPTY;
  }
}
