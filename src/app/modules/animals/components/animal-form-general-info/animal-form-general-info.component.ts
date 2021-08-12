import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment/moment';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ESex } from '../../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { AnimalsService } from '../../animals.service';
import { AnimalDictionary } from '../../enums/animals.enum';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';
import { AnimalMapperService } from '../../services/animal-mapper.service';

@Component({
  selector: 'app-animal-form-general-info',
  templateUrl: './animal-form-general-info.component.html',
  styleUrls: ['./animal-form-general-info.component.scss']
})
export class AnimalFormGeneralInfoComponent implements OnInit, OnDestroy {
  public get foundMinDate(): string | Moment | undefined {
    if (this.formGroup && this.formGroup?.get('birthDate')) {
      return this.formGroup.get('birthDate').value;
    }
    return undefined;
  }

  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }

  public get isCreateMode(): boolean {
    return !this.animalId;
  }

  public allSpecies$: Observable<IGenericDictionary[]>;
  public allStatus$: Observable<IGenericDictionary[]>;
  @Input() public animalId: number;
  public formGroup: FormGroup;
  @Input() public groupName: string;
  @Input() public parentGroup: FormGroup;
  public todayDate = moment().toISOString();

  private onDestroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private animalsDictionariesService: AnimalDictionariesService,
              private animalService: AnimalsService) {
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initFormGroup();
    this.appendFormToParentGroup();
    this.initDictionaries();
    this.loadFormData();
  }

  private appendFormToParentGroup(): void {
    if (this.groupName && this.groupName.length) {
      this.parentGroup.addControl(this.groupName, this.formGroup);
    }
  }

  private initDictionaries(): void {
    this.allSpecies$ = this.animalsDictionariesService.select(AnimalDictionary.SPECIES);
    this.allStatus$ = this.animalsDictionariesService.select(AnimalDictionary.STATUS).pipe(
      map(statuses => {
        if (!this.isCreateMode) {
          return statuses;
        }
        const allowedStatus = ['FOR_ADOPTION', 'QUARANTINE'];
        return statuses.filter(status => allowedStatus.includes(status.name))
      })
    );
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: this.formBuilder.control(null),
      birthDate: this.formBuilder.control(null, [Validators.required]),
      chipNumber: this.formBuilder.control(null, [Validators.required, FormUtilsService.onlyDigitalValidator()]),
      foundDate: this.formBuilder.control(null, [Validators.required]),
      foundPlace: this.formBuilder.control(null, [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required]),
      sex: this.formBuilder.control(null, [Validators.required]),
      speciesId: this.formBuilder.control(null, [Validators.required]),
      statusId: this.formBuilder.control(null, [Validators.required])
    });
  }

  private loadFormData(): void {
    if (!this.isCreateMode) {
      this.animalService.getAnimalDetails({id: this.animalId}).pipe(
        takeUntil(this.onDestroy$),
        map(response => AnimalMapperService.generalAnimalToFormAnimal(response.data))
      ).subscribe(data => {
        this.formGroup.patchValue(data);
      });
    }
  }
}
