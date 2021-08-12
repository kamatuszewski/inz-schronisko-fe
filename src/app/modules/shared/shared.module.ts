import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { ConfirmDecisionModalComponent } from './components/confirm-decision-modal/confirm-decision-modal.component';
import { DetailsItemComponent } from './components/details-item/details-item.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ListComponent } from './components/list/list.component';
import { LogoComponent } from './components/logo/logo.component';
import { StatusComponent } from './components/status/status.component';
import { ValidationPipe } from './pipes/validation.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    LogoComponent,
    ListComponent,
    ListTableComponent,
    ValidationPipe,
    DetailsItemComponent,
    StatusComponent,
    ConfirmDecisionModalComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  exports: [
    LogoComponent,
    ListComponent,

    TranslocoModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    ValidationPipe,
    DetailsItemComponent,
    StatusComponent,
    MatTabsModule,
    MatMenuModule,
    ListTableComponent,
    ConfirmDecisionModalComponent,
    MatDialogModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    ConfirmDecisionModalComponent
  ]
})
export class SharedModule { }
