import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { ERole } from '../../../users/enums/user.enum';
import { IGeneralUser } from '../../../users/interfaces/user.interface';
import { UserDictionariesService } from '../../../users/services/user-dictionaries.service';
import { UserListService } from '../../../users/services/user-list.service';
import { IAnimalsGroupBySpecies, IAnimalVetVisitForm } from '../../interfaces/animals.interface';
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
  public allVet$: Observable<IGeneralUser[]>;
  public animalId: number = null;
  public animalsGroupBySpecies$: Observable<IAnimalsGroupBySpecies[]>;
  public formGroup: FormGroup;
  public speciesId: number;

  private onDestroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private animalListService: AnimalListService,
              private animalFormService: AnimalFormService,
              private animalDictionaryService: AnimalDictionariesService,
              private userDictionaryService: UserDictionariesService,
              private userListService: UserListService,
              private coreService: CoreService) {
    this.animalId = activatedRoute.snapshot.params.id;
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
      const value: IAnimalVetVisitForm = this.formGroup.value;
      this.animalFormService.createVetVisit(value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.successSave, this.failedSave);
    }
  }

  private failedSave = (): void => {
    this.coreService.showErrorMessage('ANIMALS.FORM.VET_VISIT.MESSAGES.ERROR');
  };

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      description: this.formBuilder.control(null),
      animalId: this.formBuilder.control(+this.animalId, Validators.required),
      vetId: this.formBuilder.control(null, Validators.required),
      visitDate: this.formBuilder.control(null, Validators.required)
    });
  }

  private initList(): void {
    this.animalsGroupBySpecies$ = forkJoin(
      this.animalListService.fetchList(),
      this.animalDictionaryService.getSpeciesList()
    ).pipe(map(([animals, species]) =>
      AnimalMapperService.animalsGroupBySpecies(animals, species)));

    this.allVet$ = combineLatest(
      this.userListService.fetchList(),
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

  private redirectToBackPage(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private successSave = (): void => {
    this.coreService.showSuccessMessage('ANIMALS.FORM.VET_VISIT.MESSAGES.SUCCESS');
    this.redirectToBackPage();
  };
}
