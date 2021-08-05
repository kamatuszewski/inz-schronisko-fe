import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalListComponent
  },
  {
    path: 'create',
    component: AnimalFormComponent
  },
  {
    path: ':id',
    component: AnimalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
