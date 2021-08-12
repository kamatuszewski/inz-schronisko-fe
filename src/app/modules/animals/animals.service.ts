import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAnimalDetailsRequest, IAnimalDetailsResponse } from './interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private baseUrl = environment.apiUrl.animals;
  constructor(private http: HttpClient) {}

  public getAnimalDetails(payload: IAnimalDetailsRequest): Observable<IAnimalDetailsResponse> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.get<IAnimalDetailsResponse>(url);
  }
}
