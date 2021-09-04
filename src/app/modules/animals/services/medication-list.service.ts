import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { IMedication } from '../interfaces/vet.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicationListService implements IBaseListService<IMedication> {
  private readonly baseUrl: string = environment.apiUrl.medicines;
  constructor(private http: HttpClient) { }

  public fetchList(): Observable<IMedication[]> {
    return this.getList();
  }

  private getList(): Observable<IMedication[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<IMedication[]>(url);
  }
}
