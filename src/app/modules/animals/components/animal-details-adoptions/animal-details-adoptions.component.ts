import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { CoreService } from '../../../core/core.service';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ConfirmDecisionModalService } from '../../../shared/services/confirm-decision-modal.service';
import { AnimalsService } from '../../animals.service';
import { animalDetailsAdoptionTableConfig } from '../../const/table-config.const';
import { IAnimalDetailsAdoption, IGeneralAdoption } from '../../interfaces/animals.interface';
import { AnimalMapperService } from '../../services/animal-mapper.service';

@Component({
  selector: 'app-animal-details-adoptions',
  templateUrl: './animal-details-adoptions.component.html',
  styleUrls: ['./animal-details-adoptions.component.scss']
})
export class AnimalDetailsAdoptionsComponent implements OnInit, OnDestroy {
  @Input()
  public set data(data: IGeneralAdoption[]) {
    this.adoptions = data && data.length ? data.map(AnimalMapperService.generalAdoptionToDetailsAdoption) : [];
  }

  public adoptions: IAnimalDetailsAdoption[];
  public hasAccessToRemoveAdoption: boolean = false
  public tableColumns: ITableColumn[];

  private onDestroy$ = new Subject<void>();

  constructor(private authService: AuthService,
              private animalsService: AnimalsService,
              private coreService: CoreService,
              private confirmDecisionModalService: ConfirmDecisionModalService) {
  }

  public initColumnTable(): void {
    this.tableColumns = animalDetailsAdoptionTableConfig;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.confirmDecisionModalService.destroy();
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.loadAccessToViews();
  }

  public remove(id: number): void {
    const data = {
      description: 'ANIMALS.DETAILS.ADOPTIONS.CONFIRMATION_REMOVE',
      ...ConfirmDecisionModalService.defaultActionConfig()
    }
    this.confirmDecisionModalService.openDialog(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.removeAdoption(id));
  }

  private loadAccessToViews():void {
    this.hasAccessToRemoveAdoption = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.REMOVE_ADOPTION));
  }

  private removeAdoption = (id: number): void => {
    this.animalsService.removeAdoption({id})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        () => {
          this.coreService.showSuccessMessage('ANIMALS.DETAILS.ADOPTIONS.MESSAGES.SUCCESS')
          this.coreService.reloadComponent();
        },
        () => this.coreService.showSuccessMessage('ANIMALS.DETAILS.ADOPTIONS.MESSAGES.ERROR')
      )
  }
}
