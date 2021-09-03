import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { dateFormat } from '../../../core/commons/date-format.common';
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

  private onDestroy$ = new Subject<void>();
  private userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService) {
    this.userId = activatedRoute.snapshot.params.id;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    if (!!this.userId) {
      this.data$ = this.usersService.getVolunteer({id: this.userId});
    }
  }
}
