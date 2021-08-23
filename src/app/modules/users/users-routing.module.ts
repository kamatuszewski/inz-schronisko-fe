import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { OnlyAllowedRoleGuard } from '../auth/guards/only-allowed-role.guard';
import { EOperation } from '../core/commons/permissions.common';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoleFormComponent } from './components/user-role-form/user-role-form.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';

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
      operation: EOperation.ADD_USER_AND_ADOPTER
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
    path: 'volunteers',
    component: VolunteerListComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_VOLUNTEER_LIST
    }
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_DETAILS_USER
    }
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.EDIT_USER
    }
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_EMPLOYEE_DETAILS
    }
  },
  {
    path: 'volunteers/:id',
    component: VolunteerDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_DETAILS_VOLUNTEER
    }
  },
  {
    path: ':id/edit/add-role',
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
