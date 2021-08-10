import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalListComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: 'create',
    component: AnimalFormComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: ':id',
    component: AnimalDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
