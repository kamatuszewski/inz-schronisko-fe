import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { ISimpleAnimal } from '../interfaces/animals.interface';
import { IMedication, ITreatment } from '../interfaces/vet.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentListService implements IBaseListService<ITreatment> {
  private readonly baseUrl: string = environment.apiUrl.treatments;
  constructor(private http: HttpClient) { }

  public fetchList(): Observable<ITreatment[]> {
    return this.getList();
  }

  private getList(): Observable<ITreatment[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ITreatment[]>(url);
  }
}
