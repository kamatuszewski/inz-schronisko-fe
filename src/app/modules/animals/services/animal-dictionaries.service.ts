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
  private baseUrl = environment.apiUrl.dictionaries;

  constructor(private http: HttpClient) {
    super();
    this.getAndDispatchSpeciesList();
  }

  public getAndDispatchSpeciesList(): void {
    this.dispatch(AnimalDictionary.SPECIES, this.getSpeciesList());
  }

  public getSpeciesList(): Observable<IGenericDictionary[]> {
    const url = `${this.baseUrl}/species`;
    return this.http.get<IGenericDictionary[]>(url).pipe(catchError(() => of(JSON.parse('[\n' +
      '    {\n' +
      '        "id": 1,\n' +
      '        "name": "DOG"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 2,\n' +
      '        "name": "CAT"\n' +
      '    },\n' +
      '    {\n' +
      '        "id": 5,\n' +
      '        "name": "PARROT"\n' +
      '    }\n' +
      ']'))));
  }
}
