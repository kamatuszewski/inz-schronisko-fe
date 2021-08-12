import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDecisionModalComponent } from '../components/confirm-decision-modal/confirm-decision-modal.component';
import { IActionConfirmDecisionModal, IConfirmDecisionModal } from '../interfaces/modal.interface';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDecisionModalService {
  public static defaultActionConfig(): IActionConfirmDecisionModal {
    return {
      accept: 'COMMON.ACTIONS.ACCEPT',
      cancel: 'COMMON.ACTIONS.CANCEL'
    }
  }

  private static configDialog(data: IConfirmDecisionModal): MatDialogConfig {
    return {
      minWidth: '250px',
      width: 'auto',
      data
    }
  }
  private dialogRef: MatDialogRef<ConfirmDecisionModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  public destroy(): void {
    this.dialogRef.close();
  }

  public openDialog(data: IConfirmDecisionModal): Observable<boolean> {
    this.dialogRef = this.dialog.open(ConfirmDecisionModalComponent, ConfirmDecisionModalService.configDialog(data));

    return this.dialogRef.afterClosed().pipe(filter(decision => !!decision));
  }
}
