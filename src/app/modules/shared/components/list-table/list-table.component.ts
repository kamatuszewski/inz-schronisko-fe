import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationData, SortConfig } from '../../interfaces/list-config.interface';
import { ITableColumn } from '../../interfaces/table-column.interface';
import { ITableData } from '../../interfaces/table-data.interface';
import { PrepareListRequestService } from '../../services/prepare-list-request.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit, OnDestroy {
  @Input()
  public set tableColumns(columns: ITableColumn[]) {
    this.setDisplayedColumns(columns);
    this.columns = columns;
  }

  @Input()
  public set tableData(data: any) {
    this.setTableDataSource(data);
    this.isEmptyList = !data?.length;
  }

  @Input() public columnPrefix: string;
  public columns: ITableColumn[];
  public dataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @Input() public expandable = false;
  public expandedDetailsId: number | null = null;
  @Input() public expandedDetailsRef: TemplateRef<any>;
  public isEmptyList = false;
  @Input() public isPagination = false;
  public pageNumber: number;
  public paginationData: PaginationData = null;
  @Output() public removeRow = new EventEmitter<number>();
  @Input() public selectable = true;
  @Output() public selectRow = new EventEmitter<number>();
  public sort: SortConfig = {};

  private onDestroy$ = new Subject<void>();

  constructor(
    private prepareListRequestService: PrepareListRequestService) {
  }

  public changePage(page: PageEvent): void {
    this.prepareListRequestService.dispatchPage(page.pageIndex + 1);
    this.pageNumber = page.pageIndex;
  }

  public isExpandedDetails(expandedId: number): boolean {
    return !!this.expandedDetailsId && this.expandedDetailsId === expandedId;
  }

  public loadPaginationData(): void {
    this.prepareListRequestService.selectPaginationData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.paginationData = data;
        this.pageNumber = this.prepareListRequestService.getPage();
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.prepareListRequestService.reset();
    this.prepareListRequestService.resetFilter();
  }

  public ngOnInit(): void {
    this.loadPaginationData();
  }

  public remove(id: number): void {
    this.removeRow.emit(id);
  }

  public select(id: number): void {
    if (!!this.selectable && !this.expandable) {
      this.selectRow.next(id);
    }
    if (this.expandable) {
      this.expandedDetailsId = this.expandedDetailsId === id ? null : id;
    }
  }

  public setSort(code: string, type: 'ASC' | 'DESC'): void {
    if (this.sort.sortDirection === type && this.sort.local === code) {
      this.sort = {};
    } else {
      this.sort = {
        sortBy: this.capitalizeText(code),
        local: code,
        sortDirection: type
      }
    }
    this.prepareListRequestService.dispatchSort(this.sort);
  }

  private capitalizeText(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private setDisplayedColumns(columns: ITableColumn[]): void {
    const columnNames = columns.map(tableColumn => tableColumn.code);
    this.displayedColumns = [...columnNames];
  }

  private setTableDataSource(data: any): void {
    this.dataSource = new MatTableDataSource<ITableData>(data);
  }
}
