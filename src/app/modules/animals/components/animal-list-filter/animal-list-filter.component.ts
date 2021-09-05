import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ESex } from '../../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { PrepareListRequestService } from '../../../shared/services/prepare-list-request.service';
import { AnimalDictionary } from '../../enums/animals.enum';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';

@Component({
  selector: 'app-animal-list-filter',
  templateUrl: './animal-list-filter.component.html',
  styleUrls: ['./animal-list-filter.component.scss']
})
export class AnimalListFilterComponent implements OnInit, OnDestroy {
  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }

  public allSpecies$: Observable<IGenericDictionary[]>;
  public allStatus$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AnimalListFilterComponent>,
    private animalsDictionariesService: AnimalDictionariesService,
    private formBuilder: FormBuilder,
    private prepareRequest: PrepareListRequestService) {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public filter(): void {
    this.prepareRequest.dispatchFilter(this.formGroup.value);
    this.dialogRef.close(this.formGroup.value);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initFormGroup();
    this.initDictionaries();
    this.loadFormData();
  }

  public reset(): void {
    this.prepareRequest.resetFilter();
    this.formGroup.reset();
  }

  private initDictionaries(): void {
    this.allSpecies$ = this.animalsDictionariesService.select(AnimalDictionary.SPECIES);
    this.allStatus$ = this.animalsDictionariesService.select(AnimalDictionary.STATUS);
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      Name: this.formBuilder.control(null),
      Sex: this.formBuilder.control(null),
      SpeciesId: this.formBuilder.control(null),
      StatusId: this.formBuilder.control(null)
    });
  }

  private loadFormData(): void {
    this.prepareRequest.selectFilter()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.formGroup.patchValue(data);
        this.formGroup.updateValueAndValidity();
      })
  }
}
