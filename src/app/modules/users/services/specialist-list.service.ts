import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { ISpecialist } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecialistListService implements IBaseListService<ISpecialist> {
  private readonly baseUrl: string = environment.apiUrl.persons;
  constructor(private http: HttpClient) { }

  public fetchList(): Observable<ISpecialist[]> {
    return this.getList();
  }

  private getList(): Observable<ISpecialist[]> {
    const url = `${this.baseUrl}/Vets/Specialties`;
    return this.http.get<ISpecialist[]>(url);
  }
}
