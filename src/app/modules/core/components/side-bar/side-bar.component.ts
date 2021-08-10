import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ERole } from '../../../users/enums/user.enum';
import { tabConfig } from '../../commons/tab.common';
import { IAllowedRole } from '../../interfaces/permissions.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, IAllowedRole {
  public tabs = tabConfig.filter(tab => this.hasSomeAllowedRole(tab.allowedRoles));
  constructor(private authService: AuthService, private router: Router) { }

  public hasSomeAllowedRole(roles: ERole[]): boolean {
    return this.authService.hasSomeAllowedRole(...roles);
  }

  public ngOnInit(): void {
  }

  public redirectTo(redirectTo: string[]): void {
    this.router.navigate(redirectTo).then();
  }
}
