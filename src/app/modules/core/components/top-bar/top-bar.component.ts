import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { IPersonalData } from '../../interfaces/personal-data.interface';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  public personalData: IPersonalData;
  private onDestroy$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  public logout(): void {
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initPersonalData();
  }

  private initPersonalData(): void {
    this.authService.selectProfile().pipe(
      takeUntil(this.onDestroy$),
      filter(profile => !!profile)
    ).subscribe(profile => {
      this.personalData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.roles[0]
      }
    })
  }
}
