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
import { UserDictionariesService } from '../../services/user-dictionaries.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, IFormActions, OnDestroy {

  public get anEmployeeWasSelected(): boolean {
    return this.selectedRole === ERole.EMPLOYEE;
  }

  public get anVetWasSelected(): boolean {
    return this.selectedRole === ERole.VET;
  }

  public get anVolunteerWasSelected(): boolean {
    return this.selectedRole === ERole.VOLUNTEER;
  }
  public get isCreateMode(): boolean {
    return !this.userId;
  }

  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }

  public allRole$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  public userId: number;

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
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      this.userService.createUser(formValue)
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

  private failedSave = (): void => {
    this.coreService.showErrorMessage('USERS.FORM.CREATE.MESSAGES.ERROR')
  }

  private initDictionaries(): void {
    this.allRole$ = this.userDictionariesService.getRoleList();
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
      PESEL: this.formBuilder.control(null, [Validators.required, FormUtilsService.peselValidator()]),
      phoneNumber: this.formBuilder.control(null, [Validators.required, FormUtilsService.phoneValidator()]),
      PWZNumber: this.formBuilder.control(null),
      quitDate: this.formBuilder.control(null),
      roleId: this.formBuilder.control(null, [Validators.required]),
      salary: this.formBuilder.control(null),
      sex: this.formBuilder.control(null, [Validators.required]),
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
    }
  }
}