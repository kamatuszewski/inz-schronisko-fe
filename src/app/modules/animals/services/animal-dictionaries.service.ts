import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';
import { GenericDictionariesService } from '../../shared/services/generic-dictionaries.service';
import { AnimalDictionary } from '../enums/animals.enum';

@Injectable({
  providedIn: 'root'
})
export class AnimalDictionariesService extends GenericDictionariesService<AnimalDictionary, IGenericDictionary> {
  private baseUrl = environment.apiUrl.animals;
  private medicinesUrl = environment.apiUrl.medicines;
  private treatmentsUrl = environment.apiUrl.treatments;

  constructor(private http: HttpClient) {
    super();
    this.getAndDispatchSpeciesList();
    this.getAndDispatchStatusList();
    this.getAndDispatchMedicinesList();
    this.getAndDispatchTreatmentsList();
  }

  public getAndDispatchMedicinesList(): void {
    this.dispatch(AnimalDictionary.MEDICINES, this.getMedicinesList());
  }

  public getAndDispatchSpeciesList(): void {
    this.dispatch(AnimalDictionary.SPECIES, this.getSpeciesList());
  }

  public getAndDispatchStatusList(): void {
    this.dispatch(AnimalDictionary.STATUS, this.getStatusList());
  }

  public getAndDispatchTreatmentsList(): void {
    this.dispatch(AnimalDictionary.TREATMENTS, this.getTreatmentsList());
  }

  public getMedicinesList(): Observable<IGenericDictionary[]> {
    const url = `${this.medicinesUrl}`;
    return this.http.get<IGenericDictionary[]>(url);
  }

  public getSpeciesList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/species`;
    return this.http.get<IGenericDictionary[]>(url);
  }

  public getStatusList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/statuses`;
    return this.http.get<IGenericDictionary[]>(url);
  }

  public getTreatmentsList(): Observable<IGenericDictionary[]> {
    const url = `${this.treatmentsUrl}`;
    return this.http.get<IGenericDictionary[]>(url);
  }
}
