import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';


@NgModule({
  declarations: [UserListComponent, EmployeeListComponent],
  imports: [
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
