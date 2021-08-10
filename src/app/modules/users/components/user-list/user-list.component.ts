import { Component, OnInit } from '@angular/core';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { userTableConfig } from '../../commons/table-config.common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor() { }

  public goToAddNewUser(): void {

  }

  public initColumnTable(): void {
    this.tableColumns = userTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectUser(id: number): void {

  }

  private initListConfig(): void {
    this.listConfig = {
      header: 'USERS.LIST.HEADER',
      create: 'USERS.LIST.CREATE',
      columnsPrefix: 'USERS.LIST.COLUMNS',
      selectable: true
    }
  }
}
