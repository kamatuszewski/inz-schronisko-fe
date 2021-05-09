import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalListComponent } from './components/animal-list/animal-list.component';


@NgModule({
  declarations: [AnimalListComponent],
  imports: [
    AnimalsRoutingModule,
    SharedModule
  ]
})
export class AnimalsModule { }
