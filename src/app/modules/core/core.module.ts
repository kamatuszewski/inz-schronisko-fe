import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { setTheme } from 'ngx-bootstrap/utils';
import { SharedModule } from '../shared/shared.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BannerComponent } from './components/banner/banner.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';


@NgModule({
  declarations: [BannerComponent, TopBarComponent, SideBarComponent, BusinessCardComponent, AvatarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BannerComponent,
    TopBarComponent,
    SideBarComponent
  ]
})
export class CoreModule {
  constructor() {
    setTheme('bs4');
  }
}
