import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';


@NgModule({
  declarations: [AnimalsListComponent],
  imports: [
    AnimalsRoutingModule,
    SharedModule
  ]
})
export class AnimalsModule { }
