import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICreateAnimalRequest, ISaveAnimalResponse, IUpdateAnimalRequest } from '../interfaces/animal-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalFormService {
  private baseUrl = environment.apiUrl.animals;
  constructor(private http: HttpClient) {}

  public createAnimal = (payload: ICreateAnimalRequest): Observable<ISaveAnimalResponse> => {
    const url = `${this.baseUrl}`;
    return this.http.post<ISaveAnimalResponse>(url, payload);
  }

  public updateAnimal = (payload: IUpdateAnimalRequest): Observable<ISaveAnimalResponse> => {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.put<ISaveAnimalResponse>(url, payload);
  }
}
