import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from '../../interfaces/table-column.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public tableColumns: ITableColumn[];
  @Input() public tableData: any;

  constructor() { }

  public goToAddNew(): void {

  }

  public ngOnInit(): void {
  }

  public openFilter(): void {

  }
}
