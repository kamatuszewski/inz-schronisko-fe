import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGenericDictionary } from '../../interfaces/generic.interface';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  public get name(): string {
    if (this.dictionaries && this.dictionaries.length && this.data?.id) {
      const data = this.dictionaries.filter(dictionary => dictionary.id === this.data.id)
      return !!data?.length ? data[0].name : '';
    }
    return '';
  }

  @Input() public additionalField?: string;
  @Input() public data: any;
  @Input() public dictionaries: IGenericDictionary[];
  @Input() public prefix?: string;
  @Input() public prefixLabel?: string;
  @Input() public canAdd = true;
  @Output() public remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
}
