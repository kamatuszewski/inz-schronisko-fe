import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IGenericDictionary } from '../../interfaces/generic.interface';
import { IAddChipModal } from '../../interfaces/modal.interface';
import { FormUtilsService } from '../../services/form-utils.service';

@Component({
  selector: 'app-add-chip-modal',
  templateUrl: './add-chip-modal.component.html',
  styleUrls: ['./add-chip-modal.component.scss']
})
export class AddChipModalComponent implements OnInit, OnDestroy {
  public dictionaries$: Observable<IGenericDictionary[]>;
  public formGroup: FormGroup;
  public translocoPrefix: string;

  private ngDestroy$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<AddChipModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAddChipModal,
              private formBuilder: FormBuilder) {
    this.dictionaries$ = this.data.list$;
    this.translocoPrefix = this.data.translocoPrefix;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribe();
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      id: this.formBuilder.control(null, Validators.required)
    });

    if (this.data?.additionalField) {
      this.formGroup.addControl(this.data?.additionalField, this.formBuilder.control(null, Validators.required));
      this.formGroup.updateValueAndValidity();
    }
  }

  private subscribe(): void {
    if (!!this.data?.additionalField) {
      this.formGroup.get(this.data?.additionalField).valueChanges
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          const value = this.formGroup.get(this.data?.additionalField).value;
          if (this.data.additionalType === 'number' && typeof value === 'string') {
            this.formGroup.get(this.data?.additionalField).setValue(+value);
            this.formGroup.get(this.data?.additionalField).updateValueAndValidity();
          }
        })
    }
  }
}
