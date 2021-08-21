import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { roleAddedFieldsMap, roleAddedFieldsValidatorMap } from '../../commons/user.common';
import { ERole } from '../../enums/user.enum';
import { UserDictionariesService } from '../../services/user-dictionaries.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss']
})
export class UserRoleFormComponent implements OnInit, OnDestroy, IFormActions {
  public get anEmployeeWasSelected(): boolean {
    return this.selectedRole === ERole.EMPLOYEE;
  }

  public get anVetWasSelected(): boolean {
    return this.selectedRole === ERole.VET;
  }

  public get anVolunteerWasSelected(): boolean {
    return this.selectedRole === ERole.VOLUNTEER;
  }

  public allRole$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  public userId: number;

  private onDestroy$ = new Subject<void>();
  private selectedRole: ERole;

  constructor(private userDictionariesService: UserDictionariesService,
              private coreService: CoreService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService) {
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
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      this.userService.addRoleToUser(this.userId, data)
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

  private failedSave = (error): void => {
    if (error.status === 404 && !!error?.error && error.error === 'USER_ROLE_EXISTS') {
      this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERRORS.' + error.error);
    } else {
      this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERROR');
    }
  }

  private initDictionaries(): void {
    this.allRole$ = this.userDictionariesService.getRoleList();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      attendance: this.formBuilder.control(null),
      hireDate: this.formBuilder.control(null),
      joiningDate: this.formBuilder.control(null),
      PWZNumber: this.formBuilder.control(null),
      quitDate: this.formBuilder.control(null),
      roleId: this.formBuilder.control(null),
      salary: this.formBuilder.control(null),
    });
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
      this.coreService.showSuccessMessage('USERS.FORM.CREATE.MESSAGES.SUCCESS');
      this.redirectToBackPage();
  }

  private updateValueAndValidator(): void {
    switch (this.selectedRole) {
      case ERole.EMPLOYEE:
        this.addedValidators(ERole.EMPLOYEE);
        this.resetOtherAddedFields(ERole.EMPLOYEE);
        break;
      case ERole.VET:
        this.addedValidators(ERole.VET);
        this.resetOtherAddedFields(ERole.VET);
        break;
      case ERole.VOLUNTEER:
        this.addedValidators(ERole.VOLUNTEER);
        this.resetOtherAddedFields(ERole.VOLUNTEER);
        break;
      default:
        this.resetOtherAddedFields(this.selectedRole);
    }
  }
}
