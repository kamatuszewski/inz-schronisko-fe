import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'animals',
    loadChildren: () => import('./modules/animals/animals.module').then(m => m.AnimalsModule),
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule),
  },
  {
    path: 'vets',
    loadChildren: () => import('./modules/vets/vets.module').then(m => m.VetsModule),
  },
  {
    path: 'volunteers',
    loadChildren: () => import('./modules/volunteers/volunteers.module').then(m => m.VolunteersModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
