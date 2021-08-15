import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { EOperation } from '../../../core/commons/permissions.common';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { AnimalsService } from '../../animals.service';
import { animalDetailsVetVisistTableConfig } from '../../const/table-config.const';
import { IGeneralVetVisit } from '../../interfaces/animals.interface';

@Component({
  selector: 'app-animal-details-vet-visits',
  templateUrl: './animal-details-vet-visits.component.html',
  styleUrls: ['./animal-details-vet-visits.component.scss']
})
export class AnimalDetailsVetVisitsComponent implements OnInit {
  @Input() public data: IGeneralVetVisit[];
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private authService: AuthService,
              private animalsService: AnimalsService,
              private listUtilsService: ListUtilsService) {
  }

  public initColumnTable(): void {
    this.tableColumns = animalDetailsVetVisistTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  private initListConfig(): void {
    const config: IListConfig = {
      columnsPrefix: 'ANIMALS.LIST.COLUMNS'
    };
    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_ANIMAL_VET_VISITS);
    this.listConfig = config;
  }
}
