import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  public goToAddNewAnimal(): void {
    console.log('go to add new');
  }

  public initColumnTable(): void {
    this.tableColumns = [
      {
        code: 'chipNumber',
        name: 'Number chipa'
      },
      {
        code: 'sex',
        name: 'Płeć'
      },
      {
        code: 'foundDate',
        name: 'Data znalezienia'
      },
      {
        code: 'foundPlace',
        name: 'Miejsce znalezienia'
      },
      {
        code: 'status',
        name: 'Status'
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
      create: 'ANIMALS.LIST.CREATE'
    }
  }
}
