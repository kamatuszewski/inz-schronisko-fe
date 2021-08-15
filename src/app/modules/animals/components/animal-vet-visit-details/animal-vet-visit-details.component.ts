import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-animal-vet-visit-details',
  templateUrl: './animal-vet-visit-details.component.html',
  styleUrls: ['./animal-vet-visit-details.component.scss']
})
export class AnimalVetVisitDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public ofObservable<T>(data: T[]): Observable<any> {
    return of(data);
  }
}
