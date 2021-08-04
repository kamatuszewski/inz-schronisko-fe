import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateAnimalRequest, ICreateAnimalResponse } from '../interfaces/animal-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalFormService {
  private baseUrl = environment.apiUrl.animals;
  constructor(private http: HttpClient) {}

  public createAnimal = (payload: ICreateAnimalRequest): Observable<ICreateAnimalResponse> => {
    const url = `${this.baseUrl}`;
    return this.http.post<ICreateAnimalResponse>(url, payload);
  }
}
