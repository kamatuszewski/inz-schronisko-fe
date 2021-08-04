import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ESex } from '../../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../../shared/interfaces/generic.interface';
import { AnimalDictionary } from '../../enums/animals.enum';
import { AnimalDictionariesService } from '../../services/animal-dictionaries.service';

@Component({
  selector: 'app-animal-form-general-info',
  templateUrl: './animal-form-general-info.component.html',
  styleUrls: ['./animal-form-general-info.component.scss']
})
export class AnimalFormGeneralInfoComponent implements OnInit {
  public allSpecies$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  public get sexOptions(): ESex[] {
    return Object.values(ESex);
  }
  @Input() public groupName: string;
  @Input() public parentGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private animalsDictionariesService: AnimalDictionariesService) {
  }

  ngOnInit(): void {
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
      birthDate: this.formBuilder.control(null),
      chipNumber: this.formBuilder.control(null),
      foundDate: this.formBuilder.control(null),
      foundPlace: this.formBuilder.control(null),
      name: this.formBuilder.control(null),
      sex: this.formBuilder.control(null),
      speciesId: this.formBuilder.control(null),
    });
  }
}
