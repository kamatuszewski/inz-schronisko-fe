import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnimalsService } from '../../animals.service';
import { IAnimalDetailsResponse } from '../../interfaces/animals.interface';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {
  public animalDetails: IAnimalDetailsResponse;
  private animalId: number;
  private onDestroy$ = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute,
              private animalsService: AnimalsService) {
    this.animalId = activatedRoute.snapshot.params.id;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.animalsService.getAnimalDetails({id: this.animalId})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => (this.animalDetails = data));
  }
}
