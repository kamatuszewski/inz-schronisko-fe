import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IAnimalDetailsRequest, IAnimalDetailsResponse } from './interfaces/animals.interface';

const MOCK = '{\n' +
  '    "data": {\n' +
  '        "birthDate": "2020-20-10",\n' +
  '        "id": 1,\n' +
  '        "name": "Tosia",\n' +
  '        "sex": "F",\n' +
  '        "status": "FOR_ADOPTION",\n' +
  '        "species": "CAT",\n' +
  '        "chipNumber": 3,\n' +
  '        "foundDate": "2020-20-10",\n' +
  '        "foundPlace": "pole",\n' +
  '        "deathDate": null\n' +
  '    },\n' +
  '    "adoptions": [\n' +
  '        {\n' +
  '            "id": 1,\n' +
  '            "adopter": {\n' +
  '                "id": 1,\n' +
  '                "firstName": "Janusz",\n' +
  '                "lastName": "Słonina",\n' +
  '                "phoneNumber": "667554332",\n' +
  '                "email": "sadsadas@wp.pl",\n' +
  '                "address": "pole monce full" \n' +
  '            },\n' +
  '            "employee": {\n' +
  '                "id": 1,\n' +
  '                "firstName": "Łucja",\n' +
  '                "lastName": "Zakonnica"\n' +
  '            },\n' +
  '            "adoptionDate": "2019-03-12",\n' +
  '            "controlDate": "2019-03-12"\n' +
  '        }\n' +
  '    ],\n' +
  '    "vetVisits": [\n' +
  '        {\n' +
  '            "id": 1,\n' +
  '            "visitDateTime": "2010-10-5",\n' +
  '            "description": "bla bla bla"\n' +
  '        }\n' +
  '    ]\n' +
  '}';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private baseUrl = environment.apiUrl.animals;
  constructor(private http: HttpClient) {}

  public getAnimalDetails(payload: IAnimalDetailsRequest): Observable<IAnimalDetailsResponse> {
    const url = `${this.baseUrl}sd/${payload.id}`;
    return this.http.get<IAnimalDetailsResponse>(url).pipe(
      catchError(() => of(JSON.parse(MOCK)))
    );
  }
}
