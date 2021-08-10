import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { ILoginRequest } from '../../interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public passwordVisibility = false;
  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  public changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public submit(): void {
    const payload: ILoginRequest = this.formGroup.value;
    this.authService.login(payload)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((cos) => console.log(cos))
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      emailAddress: this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }
}
