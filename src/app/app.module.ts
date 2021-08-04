import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { BASE_LIST_SERVICE } from './modules/shared/interfaces/base-list-service.interface';
import { BaseListService } from './modules/shared/services/base-list.service';
import { SharedModule } from './modules/shared/shared.module';
import { TranslocoRootModule } from './modules/transloco/transloco-root.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: BaseListService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
