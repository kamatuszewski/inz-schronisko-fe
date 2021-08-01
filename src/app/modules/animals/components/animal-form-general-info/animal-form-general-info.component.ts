import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-animal-form-general-info',
  templateUrl: './animal-form-general-info.component.html',
  styleUrls: ['./animal-form-general-info.component.scss']
})
export class AnimalFormGeneralInfoComponent implements OnInit {
  public formGroup: FormGroup;
  @Input() public groupName: string;
  @Input() public parentGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.appendFormToParentGroup();
  }

  private appendFormToParentGroup(): void {
    if (this.groupName && this.groupName.length) {
      this.parentGroup.addControl(this.groupName, this.formGroup);
    }
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(null),
      shelterNumber: this.formBuilder.control(null),
      type: this.formBuilder.control(null),
      chipNumber: this.formBuilder.control(null),
      birthDate: this.formBuilder.control(null),
      sex: this.formBuilder.control(null),
      foundPlace: this.formBuilder.control(null),
      foundDate: this.formBuilder.control(null),
    });
  }
}
