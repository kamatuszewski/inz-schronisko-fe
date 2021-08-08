import { Component, Input, OnInit } from '@angular/core';
import { IGeneralAnimal } from '../../interfaces/animals.interface';

@Component({
  selector: 'app-animal-details-primary-data',
  templateUrl: './animal-details-primary-data.component.html',
  styleUrls: ['./animal-details-primary-data.component.scss']
})
export class AnimalDetailsPrimaryDataComponent implements OnInit {
  @Input() public data?: IGeneralAnimal;
  constructor() { }

  ngOnInit(): void {
  }

}
