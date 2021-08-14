import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICreateAnimalRequest, ISaveAnimalResponse, IUpdateAnimalRequest } from '../interfaces/animal-form.interface';
import { IAnimalAdoptionForm, IAnimalVetVisitForm } from '../interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalFormService {
  private adoptionsUrl = environment.apiUrl.adoptions;
  private baseUrl = environment.apiUrl.animals;
  private vetVisitsUrl = environment.apiUrl.vetvisits;
  constructor(private http: HttpClient) {}

  public createAdoptions = (payload: IAnimalAdoptionForm): Observable<unknown> => {
    return this.http.post(this.adoptionsUrl, payload);
  }

  public createAnimal = (payload: ICreateAnimalRequest): Observable<ISaveAnimalResponse> => {
    const url = `${this.baseUrl}`;
    return this.http.post<ISaveAnimalResponse>(url, payload);
  }

  public createVetVisit = (payload: IAnimalVetVisitForm): Observable<unknown> => {
    return this.http.post(this.vetVisitsUrl, payload);
  }

  public updateAnimal = (payload: IUpdateAnimalRequest): Observable<ISaveAnimalResponse> => {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.put<ISaveAnimalResponse>(url, payload);
  }
}
