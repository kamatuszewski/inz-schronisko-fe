import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EOperation } from '../../../core/commons/permissions.common';
import { FilterConfig, IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { animalTableConfig } from '../../const/table-config.const';
import { AnimalListFilterComponent } from '../animal-list-filter/animal-list-filter.component';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit, OnDestroy {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  private dialogRef: MatDialogRef<any>;
  private onDestroy$ = new Subject<void>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private listUtilsService: ListUtilsService) { }

  public goToAddNewAnimal(): void {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public initColumnTable(): void {
    this.tableColumns = animalTableConfig;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectAnimal(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'ANIMALS.LIST.HEADER',
      columnsPrefix: 'ANIMALS.LIST.COLUMNS',
      isPagination: true,
      filter: true,
      openFilter: this.openFilter
    };

    this.listUtilsService.prepareParamListConfig('create', config, 'ANIMALS.LIST.CREATE', EOperation.ADD_ANIMAL);
    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_ANIMAL_DETAILS);

    this.listConfig = config;
  }

  private openFilter = (): Observable<FilterConfig> => {
    this.dialogRef = this.dialog.open(AnimalListFilterComponent, {
      width: '368px'
    });
    return this.dialogRef.afterClosed().pipe(map(this.prepareFilter));
  }

  private prepareFilter = (filter: FilterConfig): FilterConfig => {
    const filterConfig: FilterConfig = {};
    if (!!filter) {
      Object.keys(filter)
        .filter(key => filter[key] !== null || filter[key] !== undefined)
        .forEach(key => {
          const preparedKey = key.charAt(0).toUpperCase() + key.slice(1);
          filterConfig[preparedKey] = filter[key];
        })
    }
    return filterConfig;
  }
}
