import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';


@NgModule({
  declarations: [],
  imports: [
    AnimalsRoutingModule,
    SharedModule
  ]
})
export class AnimalsModule { }
