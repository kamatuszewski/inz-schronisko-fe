import { Component, OnInit } from '@angular/core';
import { BASE_LIST_SERVICE } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
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

  constructor() { }

  public initColumnTable(): void {
    this.tableColumns = employeeTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectEmployee(id: number): void {

  }

  private initListConfig(): void {
    this.listConfig = {
      header: 'EMPLOYEE.LIST.HEADER',
      columnsPrefix: 'EMPLOYEE.LIST.COLUMNS',
      selectable: true
    }
  }
}
