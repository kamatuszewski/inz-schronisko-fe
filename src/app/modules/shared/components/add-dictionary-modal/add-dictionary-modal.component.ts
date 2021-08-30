import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IAddDictionaryModal } from '../../interfaces/modal.interface';
import { FormUtilsService } from '../../services/form-utils.service';

@Component({
  selector: 'app-add-dictionary-modal',
  templateUrl: './add-dictionary-modal.component.html',
  styleUrls: ['./add-dictionary-modal.component.scss']
})
export class AddDictionaryModalComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public translocoPrefix: string;

  private ngDestroy$ = new Subject<void>();
  constructor(public dialogRef: MatDialogRef<AddDictionaryModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAddDictionaryModal,
              private formBuilder: FormBuilder) {
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
  }

  public save(): void {
    FormUtilsService.markAllAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.required)
    });
  }
}
