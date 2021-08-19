import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForOnlyLoggedInGuard } from '../auth/guards/for-only-logged-in.guard';
import { OnlyAllowedRoleGuard } from '../auth/guards/only-allowed-role.guard';
import { EOperation } from '../core/commons/permissions.common';
import { AnimalAdoptionFormComponent } from './components/animal-adoption-form/animal-adoption-form.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalVetVisitDetailsComponent } from './components/animal-vet-visit-details/animal-vet-visit-details.component';
import { AnimalVetVisitFormComponent } from './components/animal-vet-visit-form/animal-vet-visit-form.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalListComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_ANIMAL_LIST
    }
  },
  {
    path: 'create',
    component: AnimalFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_ANIMAL
    }
  },
  {
    path: 'adopt',
    component: AnimalAdoptionFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_ADOPTION
    }
  },
  {
    path: 'vet-visit',
    component: AnimalVetVisitFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_VET_VISIT
    }
  },
  {
    path: ':id/edit',
    component: AnimalFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.UPDATE_ANIMAL
    }
  },
  {
    path: ':id',
    component: AnimalDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_ANIMAL_DETAILS
    }
  },
  {
    path: ':id/adopt',
    component: AnimalAdoptionFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.ADD_ADOPTION
    }
  },
  {
    path: ':id/vet-visit/:vetVisitId',
    component: AnimalVetVisitDetailsComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.SHOW_ANIMAL_VET_VISITS
    }
  },
  {
    path: ':id/vet-visit/:vetVisitId/edit',
    component: AnimalVetVisitFormComponent,
    canActivate: [ForOnlyLoggedInGuard, OnlyAllowedRoleGuard],
    data: {
      operation: EOperation.EDIT_VET_VISIT
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
