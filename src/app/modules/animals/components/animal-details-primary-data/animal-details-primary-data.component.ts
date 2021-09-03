import { Component, Input, OnInit } from '@angular/core';
import { IGeneralAnimal } from '../../interfaces/animals.interface';
import { dateFormat } from '../../../core/commons/date-format.common';

@Component({
  selector: 'app-animal-details-primary-data',
  templateUrl: './animal-details-primary-data.component.html',
  styleUrls: ['./animal-details-primary-data.component.scss']
})
export class AnimalDetailsPrimaryDataComponent implements OnInit {
  @Input() public data?: IGeneralAnimal;
  public dateFormat = dateFormat;
  constructor() { }

  ngOnInit(): void {
  }

}
