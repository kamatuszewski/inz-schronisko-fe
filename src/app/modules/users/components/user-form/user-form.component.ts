import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from '../../../core/core.service';
import { ESex } from '../../../shared/enums/sex.enum';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { roleAddedFieldsMap, roleAddedFieldsValidatorMap } from '../../commons/user.common';
import { ERole } from '../../enums/user.enum';
import { IVetSpecialty } from '../../interfaces/user.interface';
import { UserDictionariesService } from '../../services/user-dictionaries.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, IFormActions, OnDestroy {

  public get anEmployeeWasSelected(): boolean {
    return this.selectedRole === ERole.EMPLOYEE || this.selectedRoles.map(role => role.name).includes(ERole.EMPLOYEE);
  }

  public get anVetWasSelected(): boolean {
    return this.selectedRole === ERole.VET || this.selectedRoles.map(role => role.name).includes(ERole.VET);
  }

  public get anVolunteerWasSelected(): boolean {
    return this.selectedRole === ERole.VOLUNTEER || this.selectedRoles.map(role => role.name).includes(ERole.VOLUNTEER);
  }

  public get isCreateMode(): boolean {
    return !this.userId;
  }

  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }

  public allRole$: Observable<IGenericDictionary[]>;
  public allSpecialty$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  public selectedRoles: IGenericDictionary[] = [];
  public userId: number;
  public vetSpecialties: IVetSpecialty[] = [];

  private onDestroy$ = new Subject<void>();
  private selectedRole: ERole;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private userDictionariesService: UserDictionariesService,
              private coreService: CoreService) {
    this.userId = activatedRoute.snapshot.params.id;
  }

  public cancel(): void {
    this.redirectToBackPage();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initForm();
    this.initDictionaries();
    this.subscribeRole();
    this.loadData();
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.saveUser()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.successSave, this.failedSave)
    }
  }

  private addedValidators(role: ERole): void {
    roleAddedFieldsMap.get(role)
      .forEach(field => {
        const validators = roleAddedFieldsValidatorMap.get(role).get(field)
        this.formGroup.get(field).setValidators(validators);
        this.formGroup.get(field).updateValueAndValidity();
      });
  }

  private createUser(): Observable<unknown> {
    const formValue = this.formGroup.value;
    formValue.vetSpecialties = this.vetSpecialties;
    return this.userService.createUser(formValue)
  }

  private failedSave = (): void => {
    if (this.isCreateMode) {
      this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERROR');
    } else {
      this.coreService.showErrorMessage('USERS.FORM.EDIT.MESSAGES.ERROR');
    }
  }

  private initDictionaries(): void {
    this.allRole$ = this.userDictionariesService.getRoleList();
    this.allSpecialty$ = this.userDictionariesService.getSpecialtyList();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      address: this.formBuilder.control(null, [Validators.required]),
      attendance: this.formBuilder.control(null),
      emailAddress: this.formBuilder.control(null, [Validators.required, FormUtilsService.emailValidator()]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      hireDate: this.formBuilder.control(null),
      joiningDate: this.formBuilder.control(null),
      lastName: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      pesel: this.formBuilder.control(null, [Validators.required, FormUtilsService.peselValidator()]),
      phoneNumber: this.formBuilder.control(null, [Validators.required, FormUtilsService.phoneValidator()]),
      PWZNumber: this.formBuilder.control(null),
      quitDate: this.formBuilder.control(null),
      roleId: this.formBuilder.control(null),
      salary: this.formBuilder.control(null),
      sex: this.formBuilder.control(null, [Validators.required]),
    });
  }

  private loadData(): void {
    if (!this.isCreateMode) {
      this.userService.getUser({id: this.userId})
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(user => {
          this.selectedRoles = user.roles;
          this.formGroup.patchValue(user);
          this.formGroup.updateValueAndValidity();
        })
    }
  }

  private redirectToBackPage(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private resetOtherAddedFields(role: ERole): void {
    const otherAddedFields = roleAddedFieldsMap.get(ERole.ALL)
      .filter(field => !roleAddedFieldsMap.get(role).includes(field));
    otherAddedFields.forEach(field => {
      this.formGroup.get(field).clearValidators();
      this.formGroup.get(field).reset(null);
      this.formGroup.get(field).updateValueAndValidity();
    });
  }

  private saveUser(): Observable<unknown> {
    if (this.isCreateMode) {
      return this.createUser();
    } else {
      return this.updateUser();
    }
  }

  private subscribeRole(): void {
    combineLatest(this.formGroup.get('roleId').valueChanges, this.allRole$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([roleId, roles]) => {
        const newSelectedRole = roles.filter(role => role.id === roleId)[0].name as ERole;
        if (newSelectedRole !== this.selectedRole) {
          this.selectedRole = newSelectedRole;
          this.updateValueAndValidator();
        }
      });
  }

  private successSave = (): void => {
    if (this.isCreateMode) {
      this.coreService.showSuccessMessage('USERS.FORM.CREATE.MESSAGES.SUCCESS');
      this.redirectToBackPage();
    } else {
      this.coreService.showSuccessMessage('USERS.FORM.EDIT.MESSAGES.SUCCESS');
    }
  }

  private updateUser(): Observable<unknown> {
    const formValue = this.formGroup.value;
    return this.userService.updateUser({id: this.userId, ...formValue});
  }

  private updateValueAndValidator(): void {
    switch (this.selectedRole) {
      case ERole.EMPLOYEE:
        this.addedValidators(ERole.EMPLOYEE);
        this.resetOtherAddedFields(ERole.EMPLOYEE);
        this.vetSpecialties = [];
        break;
      case ERole.VET:
        this.addedValidators(ERole.VET);
        this.resetOtherAddedFields(ERole.VET);
        break;
      case ERole.VOLUNTEER:
        this.addedValidators(ERole.VOLUNTEER);
        this.resetOtherAddedFields(ERole.VOLUNTEER);
        this.vetSpecialties = [];
        break;
    }
  }
}
