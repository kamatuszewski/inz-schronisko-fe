import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ListComponent } from './components/list/list.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    LogoComponent,
    ListComponent,
    ListTableComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    LogoComponent,
    ListComponent,

    TranslocoModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
