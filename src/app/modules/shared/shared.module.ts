import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ListComponent } from './components/list/list.component';
import { LogoComponent } from './components/logo/logo.component';
import { ValidationPipe } from './pipes/validation.pipe';

@NgModule({
  declarations: [
    LogoComponent,
    ListComponent,
    ListTableComponent,
    ValidationPipe
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
    ValidationPipe
  ],
})
export class SharedModule { }
