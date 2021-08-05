import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITableColumn } from '../../interfaces/table-column.interface';
import { ITableData } from '../../interfaces/table-data.interface';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {
  @Input() public set tableColumns(columns: ITableColumn[]) {
    this.setDisplayedColumns(columns);
    this.columns = columns;
  }

  @Input() public set tableData(data: any) {
    this.setTableDataSource(data);
  }

  @Input() public columnPrefix: string;
  public columns: ITableColumn[];
  public dataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @Input() public selectable = true;
  @Output() public selectRow = new EventEmitter<number>();

  constructor() { }

  public ngOnInit(): void {
  }

  public select(id: number): void {
    if (!!this.selectable) {
      this.selectRow.next(id)
    }
  }

  private setDisplayedColumns(columns: ITableColumn[]): void {
    const columnNames = columns.map(tableColumn => tableColumn.code);
    this.displayedColumns = [...columnNames];
  }

  private setTableDataSource(data: any): void {
    this.dataSource = new MatTableDataSource<ITableData>(data);
  }
}
