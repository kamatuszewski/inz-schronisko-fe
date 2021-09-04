import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AddDictionaryModalComponent } from '../components/add-dictionary-modal/add-dictionary-modal.component';
import { IActionModal, IAddDictionaryModal } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class AddDictionaryModalService {
  public static defaultActionConfig(): IActionModal {
    return {
      accept: 'COMMON.ACTIONS.SAVE',
      cancel: 'COMMON.ACTIONS.CANCEL'
    }
  }

  private static configDialog(data: IAddDictionaryModal): MatDialogConfig {
    return {
      minWidth: '250px',
      maxWidth: '370px',
      width: 'auto',
      data
    }
  }

  private dialogRef: MatDialogRef<AddDictionaryModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  public destroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public openDialog<T>(data: IAddDictionaryModal): Observable<T> {
    this.dialogRef = this.dialog.open(AddDictionaryModalComponent, AddDictionaryModalService.configDialog(data));

    return this.dialogRef.afterClosed().pipe(filter(decision => !!decision));
  }
}
