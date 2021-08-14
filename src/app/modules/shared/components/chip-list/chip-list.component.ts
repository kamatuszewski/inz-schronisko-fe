import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IGenericDictionary } from '../../interfaces/generic.interface';
import { AddChipModalService } from '../../services/add-chip-modal.service';
import { IActionModal, IAddChipModal } from '../../interfaces/modal.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent<T> implements OnInit, OnDestroy {
  @Input() public additionalField?: string;
  @Input() public additionalType?: 'text' | 'number';
  @Input() public data: T[];
  @Output() public dataChange = new EventEmitter<T[]>();
  @Input() public dictionaries$: Observable<IGenericDictionary[]>;
  @Input() public header: string;
  @Input() public notFound: string;
  @Input() public prefix?: string;
  @Input() public translocoPrefix?: string;

  private onDestroy$ = new Subject<void>();

  constructor(private addChipModalService: AddChipModalService) { }

  public add(): void {
    const data: IAddChipModal = {
      ...AddChipModalService.defaultActionConfig(),
      list$: this.dictionaries$,
      additionalField: this.additionalField,
      additionalType: this.additionalType,
      prefix: this.prefix,
      translocoPrefix: this.translocoPrefix
    }
    this.addChipModalService.openDialog<T>(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(chipData => this.dataChange.emit([...this.data, chipData]))
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.addChipModalService.destroy();
  }

  public ngOnInit(): void {
  }

  public remove(id: number): void {
    const newData = this.data.filter((item: any) => item.id !== id);
    this.dataChange.emit([...newData]);
  }
}