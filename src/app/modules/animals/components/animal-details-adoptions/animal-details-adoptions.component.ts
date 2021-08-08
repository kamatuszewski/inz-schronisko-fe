import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from '../../../shared/interfaces/table-column.interface';
import { animalDetailsAdoptionTableConfig } from '../../const/table-config.const';
import { IAnimalDetailsAdoption, IGeneralAdoption } from '../../interfaces/animals.interface';
import { AnimalMapperService } from '../../services/animal-mapper.service';

@Component({
  selector: 'app-animal-details-adoptions',
  templateUrl: './animal-details-adoptions.component.html',
  styleUrls: ['./animal-details-adoptions.component.scss']
})
export class AnimalDetailsAdoptionsComponent implements OnInit {
  @Input()
  public set data(data: IGeneralAdoption[]) {
    this.adoptions = data && data.length ? data.map(AnimalMapperService.generalAdoptionToDetailsAdoption) : [];
  }

  public adoptions: IAnimalDetailsAdoption[];
  public tableColumns: ITableColumn[];

  constructor() {
  }

  public initColumnTable(): void {
    this.tableColumns = animalDetailsAdoptionTableConfig;
  }

  public ngOnInit(): void {
    this.initColumnTable();
  }
}
