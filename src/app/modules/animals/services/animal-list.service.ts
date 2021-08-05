import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBaseListService } from '../../shared/interfaces/base-list-service.interface';
import { ISimpleAnimal } from '../interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalListService implements IBaseListService<ISimpleAnimal[]> {
  private animals$ = new BehaviorSubject([]);
  private readonly animalUrl: string = environment.apiUrl.animals;
  constructor(private http: HttpClient) { }

  public fetchList(): Observable<ISimpleAnimal[]> {
    return this.getAnimalList();
  }

  private getAnimalList(): Observable<ISimpleAnimal[]> {
    const url = `${this.animalUrl}`;
    return this.http.get<ISimpleAnimal[]>(url);
  }
}
