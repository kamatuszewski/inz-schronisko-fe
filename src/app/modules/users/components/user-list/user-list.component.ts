import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EOperation } from '../../../core/commons/permissions.common';
import { BASE_LIST_SERVICE } from '../../../shared/interfaces/base-list-service.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { ListUtilsService } from '../../../shared/services/list-utils.service';
import { userTableConfig } from '../../commons/table-config.common';
import { UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: UserListService
    }
  ]
})
export class UserListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private listUtilsService: ListUtilsService) { }

  public goToAddNewUser(): void {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public initColumnTable(): void {
    this.tableColumns = userTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  public selectUser(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private initListConfig(): void {
    const config: IListConfig = {
      header: 'USERS.LIST.HEADER',
      columnsPrefix: 'USERS.LIST.COLUMNS',
      isPagination: true
    }

    this.listUtilsService.prepareParamListConfig('selectable', config, true, EOperation.SHOW_DETAILS_USER);
    this.listUtilsService.prepareParamListConfig('create', config, 'USERS.LIST.CREATE', EOperation.ADD_USER);

    this.listConfig = config;
  }
}
