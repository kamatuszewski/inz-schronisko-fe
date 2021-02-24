import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    BrowserModule
  ]
})
export class CoreModule { }
