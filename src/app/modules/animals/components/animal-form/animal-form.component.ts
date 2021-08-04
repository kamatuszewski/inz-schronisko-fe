import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormActions } from '../../../shared/interfaces/form-actions.interface';
import { AnimalFormService } from '../../services/animal-form.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit, IFormActions {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private animalFormService: AnimalFormService
  ) { }

  public cancel(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public save(): void {
    this.animalFormService.createAnimal(this.formGroup.value).subscribe();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
  }
}
