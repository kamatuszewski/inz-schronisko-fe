import { Component, OnInit } from '@angular/core';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';

const ELEMENT_DATA: ISimpleAnimal[] = [
  {
    id: 1,
    chipNumber: '1',
    foundDate: '10.05.2020',
    sex: 'Samiec',
    foundPlace: 'ul. Polna 32, 00-200 Warszawa',
    status: 'Do adopcji'
  },
  {
    id: 1,
    chipNumber: '1',
    foundDate: '10.05.2020',
    sex: 'Samiec',
    foundPlace: 'ul. Polna 32, 00-200 Warszawa',
    status: 'Do adopcji'
  },
  {
    id: 1,
    chipNumber: '1',
    foundDate: '10.05.2020',
    sex: 'Samiec',
    foundPlace: 'ul. Polna 32, 00-200 Warszawa',
    status: 'Do adopcji'
  },
  {
    id: 1,
    chipNumber: '1',
    foundDate: '10.05.2020',
    sex: 'Samiec',
    foundPlace: 'ul. Polna 32, 00-200 Warszawa',
    status: 'Do adopcji'
  }
];

export interface ISimpleAnimal {
  chipNumber: string;
  foundDate: string;
  foundPlace: string;
  id: number;
  sex: string;
  status: string;
}

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  public tableColumns: ITableColumn[];
  public data = ELEMENT_DATA;
  public listConfig: IListConfig;

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

  public openFilter(): void {
    console.log('open filter');
  }

  private initListConfig(): void {
    this.listConfig = {
      header: 'ANIMALS.LIST.HEADER',
      create: 'ANIMALS.LIST.CREATE'
    }
  }
}
