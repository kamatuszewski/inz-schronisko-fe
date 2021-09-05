import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { dateFormat } from '../../../core/commons/date-format.common';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { IVolunteer } from '../../interfaces/user.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit, OnDestroy {
  public data$: Observable<IVolunteer>;
  public dateFormat = dateFormat;
  public hasAccessToEditUser = false;

  private onDestroy$ = new Subject<void>();
  private userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthService,
              private router: Router) {
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

  private loadAccessToViews(): void {
    this.hasAccessToEditUser = this.authService.hasSomeAllowedRole(...permissionsMap.get(EOperation.EDIT_USER));
  }

  private loadData(): void {
    if (!!this.userId) {
      this.data$ = this.usersService.getVolunteer({id: this.userId});
    }
  }
}
