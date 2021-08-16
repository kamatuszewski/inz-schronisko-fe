import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoleFormComponent } from './components/user-role-form/user-role-form.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [UserListComponent, EmployeeListComponent, UserFormComponent, UserRoleFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
