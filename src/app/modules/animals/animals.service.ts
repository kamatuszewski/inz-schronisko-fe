import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAnimalDetailsResponse, ISimplePayload } from './interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private adoptionsUrl = environment.apiUrl.adoptions;
  private baseUrl = environment.apiUrl.animals;
  constructor(private http: HttpClient) {}

  public getAnimalDetails(payload: ISimplePayload): Observable<IAnimalDetailsResponse> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.get<IAnimalDetailsResponse>(url);
  }

  public removeAdoption(payload: ISimplePayload): Observable<unknown> {
    const url = `${this.adoptionsUrl}/${payload.id}`;
    return this.http.delete(url);
  }

  public removeAnimal(payload: ISimplePayload): Observable<unknown> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.delete(url);
  }
}
