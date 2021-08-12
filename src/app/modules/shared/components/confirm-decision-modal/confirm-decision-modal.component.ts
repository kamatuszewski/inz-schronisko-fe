import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDecisionModal } from '../../interfaces/modal.interface';

@Component({
  selector: 'app-confirm-decision-modal',
  templateUrl: './confirm-decision-modal.component.html',
  styleUrls: ['./confirm-decision-modal.component.scss']
})
export class ConfirmDecisionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDecisionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IConfirmDecisionModal) { }

  public accept(): void {
    this.dialogRef.close(true);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }
}
