import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AddChipModalComponent } from '../components/add-chip-modal/add-chip-modal.component';
import { IActionModal, IAddChipModal } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class AddChipModalService {
  public static defaultActionConfig(): IActionModal {
    return {
      accept: 'COMMON.ACTIONS.SAVE',
      cancel: 'COMMON.ACTIONS.CANCEL'
    }
  }

  private static configDialog(data: IAddChipModal): MatDialogConfig {
    return {
      minWidth: '350px',
      width: 'auto',
      data
    }
  }

  private dialogRef: MatDialogRef<AddChipModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  public destroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public openDialog<T>(data: IAddChipModal): Observable<T> {
    this.dialogRef = this.dialog.open(AddChipModalComponent, AddChipModalService.configDialog(data));

    return this.dialogRef.afterClosed().pipe(filter(decision => !!decision));
  }
}
