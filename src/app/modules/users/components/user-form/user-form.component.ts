import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, forkJoin, of, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { dateMomentFormat } from '../../../core/commons/date-format.common';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
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
  public hasAccessToAssignSpecialist = false;
  public hasAccessToRemoveRole = false;
  public hasAccessToRemoveSpecialist = false;
  public hasOnlyEmployeeRole = false;
  public selectedRoles: IGenericDictionary[] = [];
  public userId: number;
  public vetSpecialties: IVetSpecialty[] = [];

  private onDestroy$ = new Subject<void>();
  private removeRoles: IGenericDictionary[] = [];
  private removeSpecialties: IGenericDictionary[] = [];
  private selectedRole: ERole;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private authService: AuthService,
              private userDictionariesService: UserDictionariesService,
              private coreService: CoreService) {
    this.userId = activatedRoute.snapshot.params.id;
  }

  public addSpecialist(data: IVetSpecialty): void {
    if (!this.isCreateMode) {
      this.userService.addSpecialistToUser(this.userId, {id: data.id, obtainingDate: data.obtainingDate})
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => this.coreService.showSuccessMessage('USERS.FORM.EDIT.MESSAGES.SUCCESS_SPECIALIST'),
          () => this.coreService.showSuccessMessage('USERS.FORM.EDIT.MESSAGES.ERROR_SPECIALIST'))
    }
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
    this.loadAccessToViews();
  }

  public redirectToAddRole = (): void => {
    this.router.navigate(['add-role'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public removeRole(role: IGenericDictionary): void {
    if (this.hasAccessToRemoveRole) {
      this.removeRoles.push(role);
    }
  }

  public removeSpecialty(data: IGenericDictionary): void {
    if (this.hasAccessToRemoveRole) {
      this.removeSpecialties.push(data);
    }
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
    if (formValue.roleId === null || formValue.roleId === 'null') {
      delete formValue.roleId;
    }
    return this.userService.createUser(formValue)
  }

  private failedSave = (e: HttpErrorResponse): void => {
    if (this.isCreateMode) {
      if (this.hasOnlyEmployeeRole) {
        this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERROR_ADOPTER');
      } else {
        this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERROR');
      }
    } else {
      this.coreService.showErrorMessage('USERS.FORM.EDIT.MESSAGES.ERROR');
    }

    if(!!e?.error?.errors?.EmailAddress) {
      this.setErrorSameEmailAddress();
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
      password: this.formBuilder.control(null, [Validators.minLength(6)]),
      pesel: this.formBuilder.control(null, [Validators.required, FormUtilsService.peselValidator()]),
      phoneNumber: this.formBuilder.control(null, [Validators.required, FormUtilsService.phoneValidator()]),
      PWZNumber: this.formBuilder.control(null),
      quitDate: this.formBuilder.control(null),
      roleId: this.formBuilder.control(null),
      salary: this.formBuilder.control(null),
      sex: this.formBuilder.control(null, [Validators.required]),
    });
  }

  private loadAccessToViews(): void {
    this.hasAccessToAssignSpecialist = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.ASSIGN_SPECIALIST));
    this.hasAccessToRemoveSpecialist = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.REMOVE_SPECIALIST));
    this.hasAccessToRemoveRole = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.REMOVE_ROLE_FROM_USER));
    const roles = this.authService.getProfile().roles;
    if (roles.length === 1 && roles[0] === ERole.EMPLOYEE) {
      this.hasOnlyEmployeeRole = true;
    }
  }

  private loadData(): void {
    if (!this.isCreateMode) {
      this.userService.getUser({id: this.userId})
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(user => {
          this.selectedRoles = user.roles;
          this.vetSpecialties = this.prepareSpecialties(user.specialties);
          this.formGroup.patchValue(user);
          this.formGroup.updateValueAndValidity();
        })
    }
  }

  private prepareSpecialties = (specialties: IVetSpecialty[]): IVetSpecialty[] => {
    if (!!specialties?.length) {
      return specialties.map(specialty => {
        specialty.obtainingDate = moment(specialty.obtainingDate).format(dateMomentFormat);
        return specialty;
      })
    }
    return specialties;
  }

  private redirectToBackPage(): void {
    if (this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.SHOW_DETAILS_USER))) {
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute
      }).then();
    } else {
      this.router.navigate(['animals']).then();
    }
  }

  private resetOtherAddedFields(role?: ERole): void {
    const otherAddedFields = roleAddedFieldsMap.get(ERole.ALL)
      .filter(field => {
        if (!!role) {
          return !roleAddedFieldsMap.get(role).includes(field)
        } else {
          return true;
        }
      });
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

  private sendRemoveRole(): Array<Observable<any>> | Observable<null> {
    if (this.hasAccessToRemoveRole && !!this.removeRoles?.length) {
      return this.removeRoles.map(role => {
        const obj = {
          roleId: role.id,
          quitDate: role.name === ERole.EMPLOYEE || role.name === ERole.VOLUNTEER ? moment().toISOString() : undefined
        }
        return this.userService.removeRoleFromUser(obj, this.userId);
      });
    }
    return of(null);
  }

  private sendRemoveSpecialist(): Array<Observable<any>> | Observable<null> {
    if (this.hasAccessToRemoveSpecialist && !!this.removeSpecialties?.length) {
      return this.removeSpecialties.map(specialist => {
        return this.userService.removeSpecialistFromUser(this.userId, specialist.id);
      });
    }
    return of(null);
  }

  private setErrorSameEmailAddress(): void {
    this.formGroup.get('emailAddress').setErrors({isSameAddress: true});
  }

  private subscribeRole(): void {
    combineLatest(this.formGroup.get('roleId').valueChanges, this.allRole$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([roleId, roles]) => {
        const newSelectedRole = roles.filter(role => role.id === roleId)[0];
        if (!!newSelectedRole && newSelectedRole.name !== this.selectedRole) {
          this.selectedRole = newSelectedRole.name as ERole;
          this.updateValueAndValidator();
        }
        if (!newSelectedRole) {
          this.selectedRole = null;
          this.updateValueAndValidator();
        }
      });
  }

  private successSave = (): void => {
    if (this.isCreateMode) {
      if (this.hasOnlyEmployeeRole) {
        this.coreService.showSuccessMessage('USERS.FORM.CREATE.MESSAGES.SUCCESS_ADOPTER');
      } else {
        this.coreService.showSuccessMessage('USERS.FORM.CREATE.MESSAGES.SUCCESS');
      }
    } else {
      this.coreService.showSuccessMessage('USERS.FORM.EDIT.MESSAGES.SUCCESS');
    }
    this.redirectToBackPage();
  }

  private updateUser(): Observable<unknown> {
    const formValue = this.formGroup.value;
    return this.userService.updateUser({id: this.userId, ...formValue}).pipe(
      switchMap(() => forkJoin(this.sendRemoveSpecialist())),
      switchMap(() => forkJoin(this.sendRemoveRole())),
    );
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
      default:
        this.resetOtherAddedFields();
        this.vetSpecialties = [];
    }
    const role = [ERole.EMPLOYEE, ERole.VET, ERole.DIRECTOR, ERole.ADMIN, ERole.VOLUNTEER];
    if (role.includes(this.selectedRole)) {
      this.formGroup?.get('password')?.setValidators(Validators.required);
      this.formGroup?.get('password')?.updateValueAndValidity();
    }
  }
}
