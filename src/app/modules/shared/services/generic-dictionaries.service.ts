import { Observable } from 'rxjs';
import { IGenericDictionary } from '../interfaces/generic.interface';

export abstract class GenericDictionariesService<T, D = IGenericDictionary> {
  private dictionaries$ = new Map<T, Observable<D[]>>();

  protected constructor() {}

  public dispatch(key: T, values: Observable<D[]>): void {
    this.dictionaries$.set(key, values);
  }

  public select(key: T): Observable<D[]> {
    return this.dictionaries$.get(key);
  }
}
