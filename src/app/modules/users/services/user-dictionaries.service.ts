import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';
import { GenericDictionariesService } from '../../shared/services/generic-dictionaries.service';
import { UserDictionary } from '../enums/user.enum';

@Injectable({
  providedIn: 'root'
})
export class UserDictionariesService extends GenericDictionariesService<UserDictionary, IGenericDictionary> {
  private baseUrl = environment.apiUrl.persons;

  constructor(private http: HttpClient) {
    super();
    this.getAndDispatchRoleList();
    this.getAndDispatchSpecialtyList();
  }

  public getAndDispatchRoleList(): void {
    this.dispatch(UserDictionary.ROLES, this.getRoleList());
  }

  public getAndDispatchSpecialtyList(): void {
    this.dispatch(UserDictionary.SPECIALTY, this.getSpecialtyList());
  }

  public getRoleList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/roles`;
    return this.http.get<IGenericDictionary[]>(url);
  }

  public getSpecialtyList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/vets/specialties`;
    return this.http.get<IGenericDictionary[]>(url);
  }
}
