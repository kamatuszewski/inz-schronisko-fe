import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BASE_LIST_SERVICE } from '../shared/interfaces/base-list-service.interface';
import { SharedModule } from '../shared/shared.module';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalAdoptionFormComponent } from './components/animal-adoption-form/animal-adoption-form.component';
import { AnimalDetailsAdoptionsComponent } from './components/animal-details-adoptions/animal-details-adoptions.component';
import { AnimalDetailsPrimaryDataComponent } from './components/animal-details-primary-data/animal-details-primary-data.component';
import { AnimalDetailsVetVisitsComponent } from './components/animal-details-vet-visits/animal-details-vet-visits.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalFormGeneralInfoComponent } from './components/animal-form-general-info/animal-form-general-info.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalListFilterComponent } from './components/animal-list-filter/animal-list-filter.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalVetVisitDetailsComponent } from './components/animal-vet-visit-details/animal-vet-visit-details.component';
import { AnimalVetVisitFormComponent } from './components/animal-vet-visit-form/animal-vet-visit-form.component';
import { MedicationsAndTreatmentsItemComponent } from './components/medications-and-treatments-item/medications-and-treatments-item.component';
import { MedicationsAndTreatmentsComponent } from './components/medications-and-treatments/medications-and-treatments.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { TreatmentsComponent } from './components/treatments/treatments.component';
import { AnimalListService } from './services/animal-list.service';

@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalFormComponent,
    AnimalFormGeneralInfoComponent,
    AnimalDetailsComponent,
    AnimalDetailsPrimaryDataComponent,
    AnimalDetailsAdoptionsComponent,
    AnimalDetailsVetVisitsComponent,
    AnimalAdoptionFormComponent,
    AnimalVetVisitFormComponent,
    AnimalVetVisitDetailsComponent,
    MedicationsAndTreatmentsComponent,
    MedicationsAndTreatmentsItemComponent,
    MedicationsComponent,
    TreatmentsComponent,
    AnimalListFilterComponent
  ],
  imports: [
    AnimalsRoutingModule,
    SharedModule,
    CommonModule
  ],
  entryComponents: [
    AnimalListFilterComponent
  ],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: AnimalListService
    }
  ]
})
export class AnimalsModule {
}
