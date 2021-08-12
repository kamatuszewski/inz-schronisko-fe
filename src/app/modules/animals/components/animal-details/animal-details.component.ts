import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { AnimalsService } from '../../animals.service';
import { IAnimalDetailsResponse } from '../../interfaces/animals.interface';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {
  public get showAdoptions(): boolean {
    return this.animalDetails?.adoptions && !!this.animalDetails.adoptions.length && this.hasAccessToShowAdoptions;
  }

  public get showVetVisits(): boolean {
    return this.animalDetails?.vetVisits && !!this.animalDetails.vetVisits.length && this.hasAccessToVetVisits;
  }

  public animalDetails: IAnimalDetailsResponse;
  public hasAccessToEdit = false;
  public hasAccessToRemove = false;
  public hasAccessToShowAdoptions = false;
  public hasAccessToVetVisits = false;
  private animalId: number;
  private onDestroy$ = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute,
              private animalsService: AnimalsService,
              private authService: AuthService) {
    this.animalId = activatedRoute.snapshot.params.id;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
    this.loadAccessToViews();
  }

  private loadAccessToViews(): void {
    this.hasAccessToShowAdoptions = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.SHOW_ANIMAL_ADOPTIONS))
    this.hasAccessToVetVisits = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.SHOW_ANIMAL_VET_VISITS))
    this.hasAccessToRemove = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.REMOVE_ANIMAL))
    this.hasAccessToEdit = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.UPDATE_ANIMAL))
  }

  private loadData(): void {
    this.animalsService.getAnimalDetails({id: this.animalId})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => (this.animalDetails = data));
  }
}
