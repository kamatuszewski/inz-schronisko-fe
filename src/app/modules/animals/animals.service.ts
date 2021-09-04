import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAnimalDetailsResponse, ISimplePayload, IVetVisits } from './interfaces/animals.interface';
import { IMedication, ITreatment } from './interfaces/vet.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private adoptionsUrl = environment.apiUrl.adoptions;
  private baseUrl = environment.apiUrl.animals;
  private medicinesUrl = environment.apiUrl.medicines;
  private treatmentsUrl = environment.apiUrl.treatments;
  private vetVisitsUrl = environment.apiUrl.vetvisits;
  constructor(private http: HttpClient) {}

  public addMedication(payload: IMedication): Observable<unknown> {
    const url = `${this.medicinesUrl}`;
    return this.http.post(url, payload);
  }

  public addTreatments(payload: ITreatment): Observable<unknown> {
    const url = `${this.treatmentsUrl}`;
    return this.http.post(url, payload);
  }

  public getAnimalDetails(payload: ISimplePayload): Observable<IAnimalDetailsResponse> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.get<IAnimalDetailsResponse>(url);
  }

  public getVetVisits(payload: ISimplePayload): Observable<IVetVisits> {
    const url = `${this.vetVisitsUrl}/${payload.id}`;
    return this.http.get<IVetVisits>(url);
  }

  public removeAdoption(payload: ISimplePayload): Observable<unknown> {
    const url = `${this.adoptionsUrl}/${payload.id}`;
    return this.http.delete(url);
  }

  public removeAnimal(payload: ISimplePayload): Observable<unknown> {
    const url = `${this.baseUrl}/${payload.id}`;
    return this.http.delete(url);
  }

  public removeVetVisit(payload: ISimplePayload): Observable<unknown> {
    const url = `${this.vetVisitsUrl}/${payload.id}`;
    return this.http.delete(url);
  }
}
