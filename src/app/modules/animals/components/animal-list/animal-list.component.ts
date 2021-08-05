import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  public listConfig: IListConfig;
  public tableColumns: ITableColumn[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  public goToAddNewAnimal(): void {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public initColumnTable(): void {
    this.tableColumns = [
      {
        code: 'id'
      },
      {
        code: 'name'
      },
      {
        code: 'sex',
        translated: true
      },
      {
        code: 'species',
        translated: true
      },
      {
        code: 'status',
        translated: true
      },
    ] as ITableColumn[];
  }

  public ngOnInit(): void {
    this.initColumnTable();
    this.initListConfig();
  }

  private initListConfig(): void {
    this.listConfig = {
      header: 'ANIMALS.LIST.HEADER',
      create: 'ANIMALS.LIST.CREATE',
      columnsPrefix: 'ANIMALS.LIST.COLUMNS'
    }
  }
}
