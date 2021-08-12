import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { CoreService } from '../../../core/core.service';
import { ConfirmDecisionModalService } from '../../../shared/services/confirm-decision-modal.service';
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

  constructor(private activatedRoute: ActivatedRoute,
              private animalsService: AnimalsService,
              private authService: AuthService,
              private confirmModal: ConfirmDecisionModalService,
              private coreService: CoreService,
              private router: Router) {
    this.animalId = activatedRoute.snapshot.params.id;
  }

  public edit(): void {
    this.router.navigate(['animals', 'edit', this.animalId]).then();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.confirmModal.destroy();
  }

  public ngOnInit(): void {
    this.loadData();
    this.loadAccessToViews();
  }

  public remove(): void {
    const data = {
      description: 'ANIMALS.DETAILS.CONFIRMATION_REMOVE',
      ...ConfirmDecisionModalService.defaultActionConfig()
    }
    this.confirmModal.openDialog(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.removeAnimal)
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

  private removeAnimal = (): void => {
    this.animalsService.removeAnimal({id: this.animalId})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        () => {
          this.coreService.showSuccessMessage('ANIMALS.DETAILS.MESSAGES.SUCCESS');
          this.router.navigate(['..'], {
            relativeTo: this.activatedRoute
          }).then();
        },
        () => this.coreService.showSuccessMessage('ANIMALS.DETAILS.MESSAGES.ERROR')
      )
  }
}
