import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { ICreateAnimalRequest } from '../../interfaces/animal-form.interface';
import { AnimalFormService } from '../../services/animal-form.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit, IFormActions, OnDestroy {
  public get isCreateMode(): boolean {
    return !this.animalId;
  }

  public animalId: number;
  public formGroup: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private animalFormService: AnimalFormService,
    private coreService: CoreService
  ) {
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
    this.initForm();
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const {generalInfo} = this.formGroup.value;
      this.saveData(generalInfo)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.successSave, this.failedSave);
    }
  }

  private failedSave = (): void => {
    if (this.isCreateMode) {
      this.coreService.showErrorMessage('ANIMALS.FORM.CREATE.MESSAGES.ERROR')
    } else {
      this.coreService.showErrorMessage('ANIMALS.FORM.EDIT.MESSAGES.ERROR')
    }
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
  }

  private redirectToBackPage(): void {
    this.router.navigate(['animals']).then();
  }

  private saveData(data: ICreateAnimalRequest): Observable<unknown> {
    if (this.isCreateMode) {
      return this.animalFormService.createAnimal(data)
    } else {
      return this.animalFormService.updateAnimal(data);
    }
  }

  private successSave = (): void => {
    if (this.isCreateMode) {
      this.coreService.showSuccessMessage('ANIMALS.FORM.CREATE.MESSAGES.SUCCESS');
    } else {
      this.coreService.showSuccessMessage('ANIMALS.FORM.EDIT.MESSAGES.SUCCESS');
    }
    this.redirectToBackPage();
  }
}
