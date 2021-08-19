import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { OnlyAllowedRoleGuard } from '../auth/guards/only-allowed-role.guard';
import { EOperation } from '../core/commons/permissions.common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoleFormComponent } from './components/user-role-form/user-role-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_USER_LIST
    }
  },
  {
    path: 'create',
    component: UserFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_USER
    }
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_EMPLOYEE_LIST
    }
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.EDIT_USER
    }
  },
  {
    path: 'edit/:id/add-role',
    component: UserRoleFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_ROLE_TO_USER
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
