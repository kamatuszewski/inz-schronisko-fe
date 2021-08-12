import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EOperation } from '../../../core/commons/permissions.common';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { animalTableConfig } from '../../const/table-config.const';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private listUtilsService: ListUtilsService) { }

  public goToAddNewAnimal(): void {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public initColumnTable(): void {
    this.tableColumns = animalTableConfig;
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
      columnsPrefix: 'ANIMALS.LIST.COLUMNS'
    };

    this.listUtilsService.prepareParamListConfig('create', config, 'ANIMALS.LIST.CREATE', EOperation.ADD_ANIMAL);
    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_ANIMAL_DETAILS);

    this.listConfig = config;
  }
}
