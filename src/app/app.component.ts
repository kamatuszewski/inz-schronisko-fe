import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLogged$ = this.authService.isLogged();
  constructor(private authService: AuthService, public router: Router) {
  }

  public redirectToAnimal(): void {
    this.router.navigate(['animals']).then();
  }
}
