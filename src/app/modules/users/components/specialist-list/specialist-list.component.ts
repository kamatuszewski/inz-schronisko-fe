import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EOperation } from '../../../core/commons/permissions.common';
import { CoreService } from '../../../core/core.service';
import { BASE_LIST_SERVICE } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { AddDictionaryModalService } from '../../../shared/services/add-dictionary-modal.service';
import { ConfirmDecisionModalService } from '../../../shared/services/confirm-decision-modal.service';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { specialistTableConfig } from '../../commons/table-config.common';
import { ISpecialist } from '../../interfaces/user.interface';
import { SpecialistListService } from '../../services/specialist-list.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss'],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: SpecialistListService
    }
  ]
})
export class SpecialistListComponent implements OnInit, OnDestroy {
  public listConfig: IListConfig;
  public refreshListSubject$ = new Subject<void>();
  public tableColumns: ITableColumn[];

  private onDestroy$ = new Subject<void>();
  constructor(
    private confirmModal: ConfirmDecisionModalService,
    private usersService: UsersService,
    private coreService: CoreService,
    private listUtilsService: ListUtilsService,
    private addDictionaryService: AddDictionaryModalService
  ) { }

  public initColumnTable(): void {
    this.tableColumns = specialistTableConfig;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.addDictionaryService.destroy();
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public openForm(): void {
    this.addDictionaryService.openDialog<ISpecialist>({
      translocoPrefix: `${this.listConfig.prefix}.FORM`,
      ...AddDictionaryModalService.defaultActionConfig()
    }).pipe(takeUntil(this.onDestroy$))
      .subscribe((data) =>  {
        this.save(data);
      });
  }

  public remove(id: number): void {
    const data = {
      description: 'SPECIALIST_LIST.CONFIRMATION_REMOVE',
      ...ConfirmDecisionModalService.defaultActionConfig()
    }
    this.confirmModal.openDialog(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.removeItem(id))
  }

  public save = (data: ISpecialist): void => {
    this.usersService.addSpecialist(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.success, this.failed)
  }

  private failed = (): void => {
    this.coreService.showErrorMessage('SPECIALIST_LIST.FORM.MESSAGES.ERROR');
  }

  private failedRemove = (): void => {
    this.coreService.showErrorMessage('SPECIALIST_LIST.REMOVE.MESSAGES.ERROR');
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'SPECIALIST_LIST.HEADER',
      columnsPrefix: 'SPECIALIST_LIST.LIST.COLUMNS',
      prefix: 'SPECIALIST_LIST',
      selectable: false,
      scrollable: true
    };

    this.listUtilsService.prepareParamListConfig('create', config, 'SPECIALIST_LIST.CREATE', EOperation.ADD_SPECIALIST);

    this.listConfig = config;
  }

  private removeItem = (id: number): void => {
    this.usersService.removeSpecialist({id})
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.successRemove, this.failedRemove)
  }

  private success = (): void => {
    this.coreService.showSuccessMessage('SPECIALIST_LIST.FORM.MESSAGES.SUCCESS');
    this.refreshListSubject$.next();
  }

  private successRemove = (): void => {
    this.coreService.showSuccessMessage('SPECIALIST_LIST.REMOVE.MESSAGES.SUCCESS');
    this.refreshListSubject$.next();
  }
}
