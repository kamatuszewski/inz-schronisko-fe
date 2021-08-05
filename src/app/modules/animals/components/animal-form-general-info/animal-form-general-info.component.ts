import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment/moment';
import { Observable } from 'rxjs';
import { ESex } from '../../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { AnimalDictionary } from '../../enums/animals.enum';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';

@Component({
  selector: 'app-animal-form-general-info',
  templateUrl: './animal-form-general-info.component.html',
  styleUrls: ['./animal-form-general-info.component.scss']
})
export class AnimalFormGeneralInfoComponent implements OnInit {
  public get foundMinDate(): string | Moment | undefined {
    if (this.formGroup && this.formGroup?.get('birthDate')) {
      return this.formGroup.get('birthDate').value;
    }
    return undefined;
  }
  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }

  public allSpecies$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  @Input() public groupName: string;
  @Input() public parentGroup: FormGroup;
  public todayDate = moment().toISOString();

  constructor(private formBuilder: FormBuilder,
              private animalsDictionariesService: AnimalDictionariesService) {
  }

  public ngOnInit(): void {
    this.initFormGroup();
    this.appendFormToParentGroup();
    this.initDictionaries();
  }

  private appendFormToParentGroup(): void {
    if (this.groupName && this.groupName.length) {
      this.parentGroup.addControl(this.groupName, this.formGroup);
    }
  }

  private initDictionaries(): void {
    this.allSpecies$ = this.animalsDictionariesService.select(AnimalDictionary.SPECIES);
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
    });
  }
}
