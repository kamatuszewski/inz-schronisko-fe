import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EOperation } from '../../../core/commons/permissions.common';
import { CoreService } from '../../../core/core.service';
import { BASE_LIST_SERVICE, IBaseListService } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { AnimalsService } from '../../animals.service';
import { vetDictionaryTableConfig } from '../../const/table-config.const';
import { ITreatment } from '../../interfaces/vet.interface';
import { MedicationListService } from '../../services/medication-list.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: MedicationListService
    }
  ]
})
export class MedicationsComponent implements OnInit, OnDestroy {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  private onDestroy$ = new Subject<void>();
  constructor(private listUtilsService: ListUtilsService,
              private animalsService: AnimalsService,
              private coreService: CoreService,
              @Inject(BASE_LIST_SERVICE) private listService: IBaseListService) { }


  public initColumnTable(): void {
    this.tableColumns = vetDictionaryTableConfig;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public save = (data: ITreatment): void => {
    this.animalsService.addMedication(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.success, this.failed)
  }

  private failed = (): void => {
    this.coreService.showErrorMessage('MEDICATIONS_AND_TREATMENTS.MEDICATIONS.FORM.MESSAGE.FAILED');
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'MEDICATIONS_AND_TREATMENTS.MEDICATIONS.HEADER',
      columnsPrefix: 'MEDICATIONS_AND_TREATMENTS.LIST.COLUMNS',
      prefix: 'MEDICATIONS_AND_TREATMENTS.MEDICATIONS',
      selectable: false,
      scrollable: true
    };

    this.listUtilsService.prepareParamListConfig('create', config, 'MEDICATIONS_AND_TREATMENTS.CREATE', EOperation.ADD_MEDICINES);

    this.listConfig = config;
  }

  private success = (): void => {
    this.coreService.showSuccessMessage('MEDICATIONS_AND_TREATMENTS.MEDICATIONS.FORM.MESSAGE.SUCCESS');
    this.listService.fetchList
  }
}
