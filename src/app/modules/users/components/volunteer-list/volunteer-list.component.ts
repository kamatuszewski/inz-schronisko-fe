import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EOperation } from '../../../core/commons/permissions.common';
import { BASE_LIST_SERVICE } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { volunteerTableConfig } from '../../commons/table-config.common';
import { VolunteerListService } from '../../services/volunteer-list.service';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss'],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: VolunteerListService
    }
  ]
})
export class VolunteerListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private listUtilsService: ListUtilsService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  public initColumnTable(): void {
    this.tableColumns = volunteerTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectVolunteer(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRouter
    })
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'VOLUNTEER.LIST.HEADER',
      columnsPrefix: 'VOLUNTEER.LIST.COLUMNS',
    };

    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_DETAILS_VOLUNTEER);

    this.listConfig = config;
  }
}
