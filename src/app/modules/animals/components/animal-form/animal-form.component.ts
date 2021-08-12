import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from '../../../core/core.service';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { AnimalFormService } from '../../services/animal-form.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit, IFormActions, OnDestroy {
  public formGroup: FormGroup;

  private animalId: number;
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
    this.redirectToList();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public get isCreateMode(): boolean {
    return !this.animalId;
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const {generalInfo} = this.formGroup.value;
      this.animalFormService.createAnimal(generalInfo)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.successSave, this.failedSave);
    }
  }

  private failedSave = (): void => {
    this.coreService.showErrorMessage('ANIMALS.FORM.CREATE.MESSAGES.ERROR')
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
  }

  private redirectToList(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  private successSave = (): void => {
    this.coreService.showSuccessMessage('ANIMALS.FORM.CREATE.MESSAGES.SUCCESS');
    this.redirectToList();
  }
}
