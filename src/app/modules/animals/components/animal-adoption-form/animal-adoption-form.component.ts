import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, forkJoin, zip, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { GenericDictionariesService } from '../../../shared/services/generic-dictionaries.service';
import { IGeneralUser } from '../../../users/interfaces/user.interface';
import { UserListService } from '../../../users/services/user-list.service';
import { AnimalStatus } from '../../enums/animals.enum';
import { IAnimalsGroupBySpecies, IAnimalAdoptionForm, ISimpleAnimal } from '../../interfaces/animals.interface';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';
import { AnimalFormService } from '../../services/animal-form.service';
import { AnimalListService } from '../../services/animal-list.service';
import { AnimalMapperService } from '../../services/animal-mapper.service';

@Component({
  selector: 'app-animal-adoption-form',
  templateUrl: './animal-adoption-form.component.html',
  styleUrls: ['./animal-adoption-form.component.scss']
})
export class AnimalAdoptionFormComponent implements OnInit, OnDestroy, IFormActions {
  public allAdopters$: Observable<IGeneralUser[]>;
  public animalId: number = null;
  public animalsGroupBySpecies$: Observable<IAnimalsGroupBySpecies[]>;
  public formGroup: FormGroup;
  public speciesId: number;

  private employeeId: number;
  private onDestroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private animalListService: AnimalListService,
              private animalFormService: AnimalFormService,
              private dictionaryService: AnimalDictionariesService,
              private userListService: UserListService,
              private coreService: CoreService) {
    this.animalId = activatedRoute.snapshot.params.id;
    this.employeeId = this.authService.getProfile().id;
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
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const value: IAnimalAdoptionForm = this.formGroup.value;
      value.adoptionDate = moment().toISOString();
      this.animalFormService.createAdoptions(value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.successSave, this.failedSave);
    }
  }

  private failedSave = (): void => {
    this.coreService.showErrorMessage('ANIMALS.FORM.ADOPTION.MESSAGES.ERROR');
  };

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      notes: this.formBuilder.control(null),
      isOwnerPickup: this.formBuilder.control(false),
      animalId: this.formBuilder.control(+this.animalId, Validators.required),
      adopterId: this.formBuilder.control(null, Validators.required),
      employeeId: this.formBuilder.control(+this.employeeId)
    });
  }

  private initList(): void {
    this.animalsGroupBySpecies$ = forkJoin(
      this.animalListService.fetchList().pipe(map(animals => animals.filter(animal => animal.status === AnimalStatus.FOR_ADOPTION))),
      this.dictionaryService.getSpeciesList()
    ).pipe(map(([animals, species]) => AnimalMapperService.animalsGroupBySpecies(animals, species)));

    this.allAdopters$ = this.userListService.fetchList();
  }

  private redirectToBackPage(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private successSave = (): void => {
    this.coreService.showSuccessMessage('ANIMALS.FORM.ADOPTION.MESSAGES.SUCCESS');
    this.redirectToBackPage();
  };
}
