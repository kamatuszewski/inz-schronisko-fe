import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';
import { GenericDictionariesService } from '../../shared/services/generic-dictionaries.service';
import { AnimalDictionary } from '../enums/animals.enum';

@Injectable({
  providedIn: 'root'
})
export class AnimalDictionariesService extends GenericDictionariesService<AnimalDictionary, IGenericDictionary> {
  private baseUrl = environment.apiUrl.animals;

  constructor(private http: HttpClient) {
    super();
    this.getAndDispatchSpeciesList();
    this.getAndDispatchStatusList();
  }

  public getAndDispatchSpeciesList(): void {
    this.dispatch(AnimalDictionary.SPECIES, this.getSpeciesList());
  }

  public getAndDispatchStatusList(): void {
    this.dispatch(AnimalDictionary.STATUS, this.getStatusList());
  }

  public getSpeciesList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/species`;
    return this.http.get<IGenericDictionary[]>(url);
  }

  public getStatusList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/statuses`;
    return this.http.get<IGenericDictionary[]>(url);
  }
}
