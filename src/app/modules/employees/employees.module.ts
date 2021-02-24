import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';


@NgModule({
  declarations: [],
  imports: [
    EmployeesRoutingModule,
    SharedModule
  ]
})
export class EmployeesModule { }
