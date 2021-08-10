import { NgModule } from '@angular/core';

import { BASE_LIST_SERVICE } from '../shared/interfaces/base-list-service.interface';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListService } from './services/user-list.service';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: BASE_LIST_SERVICE,
      useClass: UserListService
    }
  ]
})
export class UsersModule { }
