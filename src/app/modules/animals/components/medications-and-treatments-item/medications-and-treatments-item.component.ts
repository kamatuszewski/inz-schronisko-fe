import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IListConfig } from '../../../shared/interfaces/list-config.interface';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { AddDictionaryModalService } from '../../../shared/services/add-dictionary-modal.service';

@Component({
  selector: 'app-medications-and-treatments-item',
  templateUrl: './medications-and-treatments-item.component.html',
  styleUrls: ['./medications-and-treatments-item.component.scss']
})
export class MedicationsAndTreatmentsItemComponent implements OnInit, OnDestroy {
  @Input() public callback: (payload: any) => void;
  @Input() public listConfig: IListConfig;
  @Output() public refresh = new EventEmitter<void>();
  @Input() public tableColumns: ITableColumn[];

  private onDestroy$ = new Subject<void>();

  constructor(private addDictionaryService: AddDictionaryModalService) { }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.addDictionaryService.destroy();
  }

  public ngOnInit(): void {

  }

  public openForm(): void {
    this.addDictionaryService.openDialog({
      translocoPrefix: `${this.listConfig.prefix}.FORM`,
      ...AddDictionaryModalService.defaultActionConfig()
    }).pipe(takeUntil(this.onDestroy$))
      .subscribe((data) =>  {
        this.callback(data);
      });
  }
}
