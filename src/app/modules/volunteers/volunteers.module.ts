import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VolunteersRoutingModule } from './volunteers-routing.module';


@NgModule({
  declarations: [],
  imports: [
    VolunteersRoutingModule,
    SharedModule,
  ]
})
export class VolunteersModule { }
