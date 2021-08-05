import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_LIST_SERVICE, IBaseListService } from '../../interfaces/base-list-service.interface';
import { IListConfig } from '../../interfaces/list-config.interface';
import { ITableColumn } from '../../interfaces/table-column.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<T> implements OnInit {
  @Input() public listConfig: IListConfig;
  @Output() public redirectToForm: EventEmitter<void> = new EventEmitter();
  @Output() public selectRow = new EventEmitter<number>();
  @Input() public tableColumns: ITableColumn[];
  public tableData: Observable<T>;

  constructor(@Inject(BASE_LIST_SERVICE) private listService: IBaseListService) { }

  public goToAddNew(): void {
    this.redirectToForm.emit();
  }

  public ngOnInit(): void {
    this.initList();
  }

  public openFilter(): void {

  }

  private initList(): void {
    this.tableData = this.listService.fetchList();
  }
}
