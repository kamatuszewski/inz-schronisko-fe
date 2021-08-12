import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [ForOnlyLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
