import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { AnimalFormService } from '../../services/animal-form.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit, IFormActions, OnDestroy {
  public formGroup: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private animalFormService: AnimalFormService
  ) { }

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

  public save(): void {
    const {generalInfo} = this.formGroup.value;
    this.animalFormService.createAnimal(generalInfo)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        () => this.redirectToList()
      );
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
  }

  private redirectToList(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }
}
