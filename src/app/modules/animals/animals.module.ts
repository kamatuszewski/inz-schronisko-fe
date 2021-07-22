import { NgModule } from '@angular/core';

import { BASE_LIST_SERVICE } from '../shared/interfaces/base-list-service.interface';
import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalListService } from './services/animal-list.service';


@NgModule({
  declarations: [AnimalListComponent],
  imports: [
    AnimalsRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: AnimalListService
    }
  ]
})
export class AnimalsModule { }
