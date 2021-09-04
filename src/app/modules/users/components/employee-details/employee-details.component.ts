import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { dateFormat } from '../../../core/commons/date-format.common';
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

  private onDestroy$ = new Subject<void>();
  private userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService
  ) {
    this.userId = activatedRoute.snapshot.params.id;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ofObservable<T>(data: T[]): Observable<any> {
    return of(data);
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
