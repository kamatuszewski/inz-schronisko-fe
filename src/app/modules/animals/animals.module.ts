import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BASE_LIST_SERVICE } from '../shared/interfaces/base-list-service.interface';
import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalFormGeneralInfoComponent } from './components/animal-form-general-info/animal-form-general-info.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalListService } from './services/animal-list.service';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalDetailsPrimaryDataComponent } from './components/animal-details-primary-data/animal-details-primary-data.component';


@NgModule({
  declarations: [AnimalListComponent, AnimalFormComponent, AnimalFormGeneralInfoComponent, AnimalDetailsComponent, AnimalDetailsPrimaryDataComponent],
  imports: [
    AnimalsRoutingModule,
    SharedModule,
    CommonModule
  ],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: AnimalListService
    }
  ]
})
export class AnimalsModule { }
