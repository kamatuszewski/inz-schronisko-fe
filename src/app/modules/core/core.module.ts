import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { setTheme } from 'ngx-bootstrap/utils';
import { SharedModule } from '../shared/shared.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BannerComponent } from './components/banner/banner.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';


@NgModule({
  declarations: [
    BannerComponent,
    TopBarComponent,
    SideBarComponent,
    BusinessCardComponent,
    AvatarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BannerComponent,
    TopBarComponent,
    SideBarComponent,
    LoaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    }
  ]
})
export class CoreModule {
  constructor() {
    setTheme('bs4');
  }
}
