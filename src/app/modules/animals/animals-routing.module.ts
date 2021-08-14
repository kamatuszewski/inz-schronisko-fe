import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { AnimalAdoptionFormComponent } from './components/animal-adoption-form/animal-adoption-form.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalVetVisitFormComponent } from './components/animal-vet-visit-form/animal-vet-visit-form.component';

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
    path: 'adopt',
    component: AnimalAdoptionFormComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: 'vet-visit',
    component: AnimalVetVisitFormComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: ':id/edit',
    component: AnimalFormComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: ':id',
    component: AnimalDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
  {
    path: ':id/adopt',
    component: AnimalAdoptionFormComponent,
    canActivate: [ForOnlyLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
