import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { dateFormat } from '../../../core/commons/date-format.common';
import { permissionsMap, EOperation } from '../../../core/commons/permissions.common';
import { IEmployee } from '../../interfaces/user.interface';
import { UserMapperService } from '../../services/user-mapper.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  public data$: Observable<IEmployee>;
  public dateFormat = dateFormat;
  public hasAccessToEditUser = false;

  private onDestroy$ = new Subject<void>();
  private userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthService,
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
      this.data$ = this.usersService.getEmployee({id: this.userId})
        .pipe(
          map(employee => {
            const specialties = employee.specialties;
            employee.specialties = UserMapperService.mapSpecialties(specialties);
            return employee;
          })
        );
    }
  }
}
