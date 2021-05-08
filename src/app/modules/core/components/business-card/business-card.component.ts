import { Component, Input } from '@angular/core';
import { IPersonalData } from '../../interceptors/personal-data.interface';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent {
  @Input() public data: IPersonalData;

  constructor() { }
}
