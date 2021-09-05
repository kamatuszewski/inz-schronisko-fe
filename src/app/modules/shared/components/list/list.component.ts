import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BASE_LIST_SERVICE, IBaseListService } from '../../interfaces/base-list-service.interface';
import { IListConfig } from '../../interfaces/list-config.interface';
import { ITableColumn } from '../../interfaces/table-column.interface';
import { PaginationAndSortService } from '../../services/pagination-and-sort.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<T> implements OnInit, OnDestroy {
  @Input() public isSmallHeader = false;
  @Input() public listConfig: IListConfig;
  @Output() public redirectToForm: EventEmitter<void> = new EventEmitter();
  @Input() public refreshList$ = new Subject<void>();
  @Output() public removeRow = new EventEmitter<number>();
  @Output() public selectRow = new EventEmitter<number>();
  @Input() public tableColumns: ITableColumn[];
  public tableData: Observable<T[]>;
  private onDestroy$ = new Subject<void>();

  constructor(
    @Inject(BASE_LIST_SERVICE) private listService: IBaseListService,
    private paginationAndSortService: PaginationAndSortService
  ) { }

  public goToAddNew(): void {
    this.redirectToForm.emit();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initList();
    this.refreshList();
  }

  public openFilter(): void {

  }

  private initList = (): void => {
    this.tableData = this.listService.fetchList();
  }

  private refreshList(): void {
    if (!!this.refreshList$) {
      this.refreshList$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.initList)
    }
    this.paginationAndSortService.refreshList()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.initList);
  }
}
