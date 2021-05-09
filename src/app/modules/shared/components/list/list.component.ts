import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableColumn } from '../../interfaces/table-column.interface';
import { IListConfig } from '../../interfaces/list-config.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() public clickAddNew: EventEmitter<void> = new EventEmitter();
  @Input() public listConfig: IListConfig;
  @Input() public tableColumns: ITableColumn[];
  @Input() public tableData: any;

  constructor() { }

  public goToAddNew(): void {
    this.clickAddNew.emit();
  }

  public ngOnInit(): void {
  }

  public openFilter(): void {

  }
}
