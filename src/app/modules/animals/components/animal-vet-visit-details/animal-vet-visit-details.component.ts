import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from '../../../core/core.service';
import { ConfirmDecisionModalService } from '../../../shared/services/confirm-decision-modal.service';
import { AnimalsService } from '../../animals.service';
import { IVetVisits } from '../../interfaces/animals.interface';

@Component({
  selector: 'app-animal-vet-visit-details',
  templateUrl: './animal-vet-visit-details.component.html',
  styleUrls: ['./animal-vet-visit-details.component.scss']
})
export class AnimalVetVisitDetailsComponent implements OnInit, OnDestroy {
  public data$: Observable<IVetVisits>;
  private onDestroy$ = new Subject<void>();
  private vetVisitId: number;
  private animalId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private animalService: AnimalsService,
              private confirmModal: ConfirmDecisionModalService,
              private coreService: CoreService,
              private router: Router
  ) {
    this.vetVisitId = activatedRoute.snapshot.params.vetVisitId;
    this.animalId = activatedRoute.snapshot.params.id;
  }

  public edit(): void {
    this.router.navigate(['animals', this.animalId, 'vet-visit', this.vetVisitId, 'edit']).then();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ofObservable<T>(data: T[]): Observable<any> {
    return of(data);
  }

  public remove(): void {
    const data = {
      description: 'VET_VISIT.DETAILS.CONFIRMATION_REMOVE',
      ...ConfirmDecisionModalService.defaultActionConfig()
    }
    this.confirmModal.openDialog(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.removeVisit)
  }

  private loadData(): void {
    if (!!this.vetVisitId) {
      this.data$ = this.animalService.getVetVisits({id: this.vetVisitId});
    }
  }

  private removeVisit = (): void => {
    this.animalService.removeVetVisit({id: this.vetVisitId})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        () => {
          this.coreService.showSuccessMessage('VET_VISIT.DETAILS.MESSAGES.SUCCESS');
          this.router.navigate(['animals', this.animalId]).then();
        },
        () => this.coreService.showSuccessMessage('VET_VISIT.DETAILS.MESSAGES.ERROR')
      )
  }
}