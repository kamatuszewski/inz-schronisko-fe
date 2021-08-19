import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { CoreService } from '../../../core/core.service';
import { ConfirmDecisionModalService } from '../../../shared/services/confirm-decision-modal.service';
import { IUserForm } from '../../interfaces/user.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public data$: Observable<IUserForm>;
  public hasAccessToEditUser = false;

  private onDestroy$ = new Subject<void>();
  private userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthService,
              private confirmModal: ConfirmDecisionModalService,
              private coreService: CoreService,
              private router: Router
  ) {
    this.userId = activatedRoute.snapshot.params.id;
  }

  public edit(): void {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute
    }).then();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
    this.loadAccessToViews();
  }

  public ofObservable<T>(data: T[]): Observable<any> {
    return of(data);
  }

  private loadAccessToViews(): void {
    this.hasAccessToEditUser = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.EDIT_USER));
  }

  private loadData(): void {
    if (!!this.userId) {
      this.data$ = this.usersService.getUser({id: this.userId});
    }
  }
}
