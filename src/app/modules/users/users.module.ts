import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [],
  imports: [
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
