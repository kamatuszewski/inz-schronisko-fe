import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IGenericDictionary } from '../../interfaces/generic.interface';
import { IAddChipModal } from '../../interfaces/modal.interface';
import { AddChipModalService } from '../../services/add-chip-modal.service';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent<T> implements OnInit, OnDestroy {
  @Input() public addFnCallback?: () => void;
  @Output() public addItem = new EventEmitter<T>();
  @Input() public additionalField?: string;
  @Input() public additionalType?: 'text' | 'number' | 'date';
  @Input() public canAdd = true;
  @Input() public canRemove = true;
  @Input() public data: T[] = [];
  @Output() public dataChange = new EventEmitter<T[]>();
  @Input() public dictionaries$: Observable<IGenericDictionary[]>;
  @Input() public header: string;
  @Input() public notFound: string;
  @Input() public prefix?: string;
  @Input() public prefixLabel?: string;
  @Output() public remove = new EventEmitter<T>();
  @Input() public translocoPrefix?: string;

  private onDestroy$ = new Subject<void>();

  constructor(private addChipModalService: AddChipModalService) { }

  public add(): void {
    if (typeof this.addFnCallback === 'function') {
      this.addFnCallback();
      return;
    }

    const data: IAddChipModal = {
      ...AddChipModalService.defaultActionConfig(),
      list$: this.dictionaries$,
      additionalField: this.additionalField,
      additionalType: this.additionalType,
      usedItems: this.preparedUsedItems(),
      prefix: this.prefix,
      translocoPrefix: this.translocoPrefix
    }
    this.addChipModalService.openDialog<T>(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(chipData => {
        if (data.additionalField && data.additionalType === 'date') {
          chipData[this.additionalField] = moment(chipData[this.additionalField]).toISOString();
        }
        this.addItem.emit(chipData);
        this.dataChange.emit([...this.data, chipData])
      })
  }

  private preparedUsedItems = (): number[] => {
    // @ts-ignore
    return this.data?.length ? this.data.map(item => item.id) : []
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.addChipModalService.destroy();
  }

  public ngOnInit(): void {
  }

  public removeItem(id: number): void {
    this.remove.emit(this.data.filter((item: any) => item.id === id)[0]);
    const newData = this.data.filter((item: any) => item.id !== id);
    this.dataChange.emit([...newData]);
  }
}
