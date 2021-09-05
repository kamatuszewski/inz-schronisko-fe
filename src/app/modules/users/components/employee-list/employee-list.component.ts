import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EOperation } from '../../../core/commons/permissions.common';
import { BASE_LIST_SERVICE } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { employeeTableConfig, userTableConfig } from '../../commons/table-config.common';
import { EmployeeListService } from '../../services/employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: EmployeeListService
    }
  ]
})
export class EmployeeListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private listUtilsService: ListUtilsService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  public initColumnTable(): void {
    this.tableColumns = employeeTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectEmployee(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRouter
    })
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'EMPLOYEE.LIST.HEADER',
      columnsPrefix: 'EMPLOYEE.LIST.COLUMNS',
      isPagination: true
    };

    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_EMPLOYEE_DETAILS);

    this.listConfig = config;
  }
}
