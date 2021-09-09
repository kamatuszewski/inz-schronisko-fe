import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { PrepareListRequestService } from '../../../shared/services/prepare-list-request.service';
import { ERole } from '../../../users/enums/user.enum';
import { IGeneralUser } from '../../../users/interfaces/user.interface';
import { UserDictionariesService } from '../../../users/services/user-dictionaries.service';
import { UserListService } from '../../../users/services/user-list.service';
import { AnimalsService } from '../../animals.service';
import { IAnimalsGroupBySpecies, IAnimalVetVisitForm, IMedicines, ITreatments } from '../../interfaces/animals.interface';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';
import { AnimalFormService } from '../../services/animal-form.service';
import { AnimalListService } from '../../services/animal-list.service';
import { AnimalMapperService } from '../../services/animal-mapper.service';

@Component({
  selector: 'app-animal-vet-visit-form',
  templateUrl: './animal-vet-visit-form.component.html',
  styleUrls: ['./animal-vet-visit-form.component.scss']
})
export class AnimalVetVisitFormComponent implements OnInit, OnDestroy, IFormActions {

  public get isEditMode(): boolean {
    return !!this.vetVisitId;
  }
  public allMedicines$: Observable<IGenericDictionary[]>;
  public allTreatments$: Observable<IGenericDictionary[]>;
  public allVet$: Observable<IGeneralUser[]>;
  public animalId: number = null;
  public animalsGroupBySpecies$: Observable<IAnimalsGroupBySpecies[]>;
  public formGroup: FormGroup;
  public medicines: IMedicines[] = [];
  public speciesId: number;
  public treatments: ITreatments[] = [];
  public vetVisitId: number = null;

  private onDestroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private animalListService: AnimalListService,
              private animalService: AnimalsService,
              private animalFormService: AnimalFormService,
              private animalDictionaryService: AnimalDictionariesService,
              private userDictionaryService: UserDictionariesService,
              private userListService: UserListService,
              private coreService: CoreService) {
    this.animalId = activatedRoute.snapshot.params.id;
    this.vetVisitId = activatedRoute.snapshot.params.vetVisitId;
  }

  public cancel(): void {
    this.redirectToBackPage();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initList();
    this.initForm();
    this.initDictionaries();
    this.loadData();
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.saveVetVisit().pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(this.successSave, this.failedSave);
    }
  }

  private blockFieldForEditForm(): void {
    const fields = ['visitDate', 'vetId', 'animalId'];
    fields.forEach(key => this.formGroup.get(key).disable())
  }

  private failedSave = (): void => {
    if (!this.isEditMode) {
      this.coreService.showErrorMessage('ANIMALS.FORM.VET_VISIT.MESSAGES.ERROR');
    } else {
      this.coreService.showErrorMessage('ANIMALS.FORM.VET_VISIT_EDIT.MESSAGES.ERROR');
    }
  };

  private initDictionaries(): void {
    this.allTreatments$ = this.animalDictionaryService.getTreatmentsList();
    this.allMedicines$ = this.animalDictionaryService.getMedicinesList();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      description: this.formBuilder.control(null, Validators.required),
      animalId: this.formBuilder.control(this.animalId ? +this.animalId : null, Validators.required),
      vetId: this.formBuilder.control(null, Validators.required),
      visitDate: this.formBuilder.control(null, Validators.required)
    });
  }

  private initList(): void {
    this.animalsGroupBySpecies$ = forkJoin(
      this.animalListService.fetchList(
        PrepareListRequestService.preparePaginationAndSortRequest(PrepareListRequestService.allDataListConfig)
      ),
      this.animalDictionaryService.getSpeciesList()
    ).pipe(map(([animals, species]) =>
      AnimalMapperService.animalsGroupBySpecies(animals, species)));

    this.allVet$ = combineLatest(
      this.userListService.fetchList(
        PrepareListRequestService.preparePaginationAndSortRequest(PrepareListRequestService.allDataListConfig)
      ),
      this.userDictionaryService.getRoleList().pipe(
        filter(role => !!role.length),
        map(role => {
          const prepareRoles = role.filter(spec => spec.name === ERole.VET);
          return prepareRoles.length > 0 ? prepareRoles[0].name : null
        }))
    ).pipe(map(([vets, rolesVet]) => {
      if (!!rolesVet && !!vets && !!vets.length) {
        return vets.filter(vet => !!vet.roles && !!vet.roles.length)
          .filter(vet => {
            return vet.roles.map(role => role.name).includes(rolesVet as ERole)
          });
      }
      return [];
    }));
  }

  private loadData(): void {
    if (!!this.vetVisitId) {
      this.animalService.getVetVisits({id: this.vetVisitId})
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(vetVisit => {
          this.medicines = vetVisit.medicines;
          this.treatments = vetVisit.treatments;
          const formValue = {
            visitDate: vetVisit.visitDate,
            vetId: vetVisit.vet.id,
            animalId: vetVisit.animal.id,
            description: vetVisit.description
          }
          this.formGroup.patchValue(formValue);
          this.blockFieldForEditForm();
        })
    }
  }

  private redirectToBackPage(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private saveVetVisit(): Observable<unknown> {
    const value: IAnimalVetVisitForm = this.formGroup.value;
    value.medicines = this.medicines;
    value.treatments = this.treatments;
    if (!this.isEditMode) {
      return this.animalFormService.createVetVisit(value)
    } else {
      value.id = this.vetVisitId;
      return this.animalFormService.updateVetVisit(value)
    }
  }

  private successSave = (): void => {
    if (this.isEditMode) {
      this.coreService.showSuccessMessage('ANIMALS.FORM.VET_VISIT_EDIT.MESSAGES.SUCCESS');
    } else {
      this.coreService.showSuccessMessage('ANIMALS.FORM.VET_VISIT.MESSAGES.SUCCESS');
    }
    this.redirectToBackPage();
  };
}
